package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Orders;
import com.audrio.backendbakrie.io.OrderRequest;
import com.audrio.backendbakrie.io.OrderResponse;
import com.audrio.backendbakrie.Repository.CustomerRepository;
import com.audrio.backendbakrie.Repository.OrderRepository;
import com.audrio.backendbakrie.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Customers customer = customerRepository.findByIdCustomer(request.getId_customer())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Orders order = Orders.builder()
                .customer(customer)
                .deliverAddress(request.getDeliver_address())
                .orderNumber(request.getOrder_number())
                .orderDate(request.getOrder_date())
                .orderStatus(request.getOrder_status())
                .build();

        Orders saved = orderRepository.save(order);
        return toResponse(saved);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse getOrderById(UUID id) {
        Orders order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrder(UUID id, OrderRequest request) {
        Orders order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setDeliverAddress(request.getDeliver_address());
        order.setOrderNumber(request.getOrder_number());
        order.setOrderDate(request.getOrder_date());
        order.setOrderStatus(request.getOrder_status());

        Orders updated = orderRepository.save(order);
        return toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteOrder(UUID id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }

    private OrderResponse toResponse(Orders order) {
        return OrderResponse.builder()
                .id_order(order.getId_order())
                .order_number(order.getOrderNumber())
                .deliver_address(order.getDeliverAddress())
                .order_date(order.getOrderDate())
                .order_status(order.getOrderStatus())
                .id_customer(order.getCustomer().getIdCustomer())
                .build();
    }
}
