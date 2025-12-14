package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.*;
import com.audrio.backendbakrie.events.OrderCancelledEvent;
import com.audrio.backendbakrie.events.OrderPaidEvent;
import com.audrio.backendbakrie.events.OrderPendingEvent;
import com.audrio.backendbakrie.events.OrderStatusChangedEvent;
import com.audrio.backendbakrie.io.OrderDetailRequest;
import com.audrio.backendbakrie.io.OrderDetailResponse;
import com.audrio.backendbakrie.io.OrdersRequest;
import com.audrio.backendbakrie.io.OrdersResponse;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.repository.OrderRepository;
import com.audrio.backendbakrie.repository.ProductRepository;
import com.audrio.backendbakrie.repository.TransactionRepository;
import com.audrio.backendbakrie.service.OrderService;
import com.audrio.backendbakrie.service.PaymentService;
import com.audrio.backendbakrie.utils.Exceptions.CustomerNotFoundException;
import com.audrio.backendbakrie.utils.Exceptions.InsufficientStockException;
import com.audrio.backendbakrie.utils.Exceptions.ResourceNotFoundException;
import com.audrio.backendbakrie.utils.Exceptions.RestrictionInOrderOperationException;
import com.audrio.backendbakrie.utils.OrderNumberGenerator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final OrderNumberGenerator orderNumberGenerator;
    private final ApplicationEventPublisher publisher;
    private final PaymentService paymentService;
    private final TransactionRepository transactionsRepository;

    @Override
    public OrdersResponse createOrder(OrdersRequest request) {
        log.info("=== MEMULAI PEMBUATAN ORDER BARU ===");
        log.info("Request dari customerId: {}", request.getCustomerId());
        log.info("Alamat pengiriman: {}", request.getDeliverAddress());
        log.info("Jumlah item di keranjang: {}", request.getOrderDetails().size());

        Customers customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));

        log.info("Customer ditemukan: {} ({})", customer.getFullname(), customer.getEmail());

        Orders order = Orders.builder()
                .orderNumber(orderNumberGenerator.generate())
                .orderDate(LocalDateTime.now())
                .orderStatus(Orders.OrderStatus.PENDING)
                .deliverAddress(request.getDeliverAddress())
                .customers(customer)
                .build();

        log.info("Order number yang digenerate: {}", order.getOrderNumber());

        double totalAmount = 0;
        for (OrderDetailRequest itemReq : request.getOrderDetails()) {
            Products product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + itemReq.getProductId()));

            log.debug("Check stock → Product: {} (ID: {}), Stock saat ini: {}, Diminta: {}",
                    product.getProductName(), product.getIdProduct(), product.getProduct_stock(), itemReq.getQuantity());

            if (product.getProduct_stock() < itemReq.getQuantity()) {
                log.warn("INSUFFICIENT STOCK → Product: {} (ID: {}), Stock: {}, Requested: {}",
                        product.getProductName(), product.getIdProduct(), product.getProduct_stock(), itemReq.getQuantity());
                throw new InsufficientStockException("Stock tidak cukup untuk produk: " + product.getProductName());
            }

            OrderDetail orderItem = OrderDetail.builder()
                    .orders(order)
                    .product( product)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(product.getProduct_price())
                    .subtotal(product.getProduct_price() * itemReq.getQuantity())
                    .build();

            order.getOrderDetails().add(orderItem);
            totalAmount = totalAmount + orderItem.getSubtotal();

            log.info("Item ditambahkan → {} × {} (Rp {}, subtotal Rp {})",
                    product.getProductName(), itemReq.getQuantity(), product.getProduct_price(), orderItem.getSubtotal());
        }

        order.setTotal(totalAmount);
        Orders savedOrder = orderRepository.save(order);

        Transactions transaction = Transactions.builder()
                .orders(savedOrder)
                .idTransaction(UUID.randomUUID())
                .totalAmount(BigDecimal.valueOf(savedOrder.getTotal()))
                .paymentMethod("MIDTRANS_SNAP")
                .paymentStatus("PENDING")
                .paymentTime(LocalDateTime.now())
                .build();

        Map<String, Object> midtransParams = buildMidtransParams(order);
        String snapToken = paymentService.createTransactionToken(midtransParams);

        transaction.setPaymentToken(snapToken);

        OrdersResponse response = convertToResponse(savedOrder);
        response.setTransactionToken(snapToken);
        return response;
    }

    public OrdersResponse updateStatus(UUID orderId, Orders.OrderStatus newStatus) {
        log.info("=== REQUEST UBAH STATUS ORDER === OrderId: {} → ke {}", orderId, newStatus);

        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        log.info("Order ditemukan → {} | Status saat ini: {}", order.getOrderNumber(), order.getOrderStatus());

        String emailCustomer = order.getCustomers().getEmail();
        String orderNumber = order.getOrderNumber();

        if (!isValidStatusTransition(order.getOrderStatus(), newStatus)) {
            log.warn("TRANSISI STATUS DITOLAK → dari {} ke {}", order.getOrderStatus(), newStatus);
            throw new RestrictionInOrderOperationException(
                    "Tidak bisa mengubah status dari " + order.getOrderStatus() + " ke " + newStatus);
        }

        Orders.OrderStatus oldStatus = order.getOrderStatus();
        order.setOrderStatus(newStatus);

        log.info("Status berhasil diubah → {} → {}", oldStatus, newStatus);

        // === Tambahan logika stok ===
        // Jika status berubah ke PENDING → kurangi stok sementara
        if (oldStatus != Orders.OrderStatus.PENDING && newStatus == Orders.OrderStatus.PENDING) {
            log.info("PUBLISH OrderPendingEvent → stok sementara dikurangi untuk order {}", order.getOrderNumber());
            publisher.publishEvent(new OrderPendingEvent(this, order));
        }

        // Jika status berubah ke CANCEL dari PENDING → kembalikan stok
        if (oldStatus == Orders.OrderStatus.PENDING && newStatus == Orders.OrderStatus.CANCELLED) {
            log.info("PUBLISH OrderCancelledEvent → stok dikembalikan untuk order {}", order.getOrderNumber());
            publisher.publishEvent(new OrderCancelledEvent(this, order));
        }

        // Jika status berubah ke PAID → kurangi stok permanen
        if (oldStatus != Orders.OrderStatus.PAID && newStatus == Orders.OrderStatus.PAID) {
            log.info("PUBLISH OrderPaidEvent → stok dikurangi permanen untuk order {}", order.getOrderNumber());
            publisher.publishEvent(new OrderPaidEvent(this, order));
        }

        // Kirim email/notif status berubah
        publisher.publishEvent(new OrderStatusChangedEvent(
                orderNumber,
                emailCustomer,
                newStatus.name()
        ));
        log.info("PUBLISH OrderStatusChangedEvent → email/notif dikirim ke {}", order.getCustomers().getEmail());

        return convertToResponse(order);
    }

    @Override
    public List<OrdersResponse> getAll() {
        log.debug("Request semua order → total: {}", orderRepository.count());
        List<Orders> orders = orderRepository.findAll();
        List<OrdersResponse> responses = orders.stream()
                .map(this::convertToResponse)
                .toList();
        return responses;
    }

    public OrdersResponse getOrderById(UUID orderId) {
        log.debug("Request detail order → ID: {}", orderId);
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return convertToResponse(order);
    }

    @Override
    public OrdersResponse getOrderByNumber(String orderNumber) {
        log.debug("Request order by number → {}", orderNumber);
        Orders order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return convertToResponse(order);
    }

    @Override
    public List<OrdersResponse> getOrdersByCustomer(UUID customerId) {
        log.debug("Request daftar order customer → ID: {}", customerId);
        Customers customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
        return orderRepository.findByCustomers(customer).stream()
                .map(this::convertToResponse)
                .toList();
    }

    public void cancelOrder(UUID orderId) {
        log.info("=== REQUEST CANCEL ORDER === OrderId: {}", orderId);

        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        log.info("Order ditemukan → {} | Status saat ini: {}", order.getOrderNumber(), order.getOrderStatus());

        if (order.getOrderStatus() == Orders.OrderStatus.  SHIPPED || order.getOrderStatus() == Orders.OrderStatus.COMPLETED) {
            log.warn("CANCEL DITOLAK → order sudah {} ", order.getOrderStatus());
            throw new RestrictionInOrderOperationException("Order sudah dikirim/tuntas, tidak bisa dibatalkan");
        }
        for (OrderDetail oi : order.getOrderDetails()) {
            Products p = oi.getProduct();
            p.setProduct_stock(p.getProduct_stock() + oi.getQuantity());
            log.info("Stok dikembalikan → {} +{} → total stok jadi {}", p.getProductName(), oi.getQuantity(), p.getProduct_stock());
        }

        order.setOrderStatus(Orders.OrderStatus.CANCELLED);
        log.info("ORDER BERHASIL DICANCEL → {}", order.getOrderNumber());
    }

    private boolean isValidStatusTransition(Orders.OrderStatus current, Orders.OrderStatus next) {
        return switch (current) {
            case PENDING -> next == Orders.OrderStatus.PAID || next == Orders.OrderStatus.CANCELLED;
            case PAID -> next == Orders.OrderStatus.SHIPPED || next == Orders.OrderStatus.CANCELLED;
            case SHIPPED -> next == Orders.OrderStatus.COMPLETED;
            case COMPLETED, CANCELLED -> false;
            default -> false;
        };
    }

    private OrdersResponse convertToResponse(Orders order) {
        List<OrderDetailResponse> items = order.getOrderDetails().stream()
                .map(oi -> OrderDetailResponse.builder()
                        .productId(oi.getProduct().getIdProduct())
                        .productName(oi.getProduct().getProductName())
                        .quantity(oi.getQuantity())
                        .unitPrice(oi.getUnitPrice())
                        .subtotal(oi.getSubtotal())
                        .build())
                .toList();

        return OrdersResponse.builder()
                .idOrder(order.getId_order())
                .orderNumber(order.getOrderNumber())
                .orderDate(order.getOrderDate())
                .orderStatus(String.valueOf(order.getOrderStatus()))
                .deliverAddress(order.getDeliverAddress())
                .totalAmount(order.getTotal())
                .customerId(order.getCustomers().getIdCustomer())
                .orderDetails(items)
                .build();
    }

    private Map<String, Object> buildMidtransParams(Orders order) {
        Map<String, Object> params = new HashMap<>();

        // Hitung ulang gross amount biar pasti sama
        double subtotal = order.getOrderDetails().stream()
                .mapToDouble(od -> od.getSubtotal())
                .sum();

        double shippingFee = 15000.0;
        double serviceFee = 2000.0;
        double grossAmount = subtotal + shippingFee + serviceFee;

        Map<String, Object> transactionDetails = new HashMap<>();
        transactionDetails.put("order_id", order.getOrderNumber());
        transactionDetails.put("gross_amount", grossAmount); // PASTI SAMA DENGAN ITEM DETAILS
        params.put("transaction_details", transactionDetails);

        List<Map<String, Object>> itemDetails = new ArrayList<>();

        for (OrderDetail od : order.getOrderDetails()) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", od.getProduct().getIdProduct().toString());
            item.put("price", od.getUnitPrice());
            item.put("quantity", od.getQuantity());
            item.put("name", od.getProduct().getProductName());
            itemDetails.add(item);
        }

        itemDetails.add(Map.of("id", "SHIPPING", "price", shippingFee, "quantity", 1, "name", "Biaya Pengiriman"));
        itemDetails.add(Map.of("id", "SERVICE", "price", serviceFee, "quantity", 1, "name", "Biaya Layanan"));

        params.put("item_details", itemDetails);

        Map<String, String> customerDetails = new HashMap<>();
        customerDetails.put("first_name", order.getCustomers().getFullname());
        customerDetails.put("email", order.getCustomers().getEmail());
        customerDetails.put("phone", order.getCustomers().getPhone_num());
        params.put("customer_details", customerDetails);

        return params;
    }
}