package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.entity.Orders;
import com.audrio.backendbakrie.io.OrdersRequest;
import com.audrio.backendbakrie.io.OrdersResponse;
import com.audrio.backendbakrie.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/customer/order/create")
    public ResponseEntity<OrdersResponse> createOrder(@Valid @RequestBody OrdersRequest request) {
        log.info("RECEIVED CREATE ORDER → customerId: {}, items: {}",
                request.getCustomerId(), request.getOrderDetails().size());

        OrdersResponse response = orderService.createOrder(request);

        log.info("ORDER CREATED SUCCESS → orderNumber: {}", response.getOrderNumber());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/employee/order/getOrderById/{orderId}")
    public ResponseEntity<OrdersResponse> getOrderById(@PathVariable UUID orderId) {
        log.debug("REQUEST ORDER DETAIL → id: {}", orderId);
        OrdersResponse response = orderService.getOrderById(orderId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/cashier/order/updateStatus/{orderId}/status")
    public ResponseEntity<OrdersResponse> updateStatus(
            @PathVariable UUID orderId,
            @RequestBody Map<String, String> body) {

        String statusStr = body.get("status");
        if (statusStr == null || statusStr.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Orders.OrderStatus newStatus = Orders.OrderStatus.valueOf(statusStr.toUpperCase());

        log.info("REQUEST CHANGE STATUS → orderId: {} → {}", orderId, newStatus);

        OrdersResponse response = orderService.updateStatus(orderId, newStatus);

        log.info("STATUS CHANGED → {} → {}", orderId, newStatus);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/public/order/getOrderByNumber/{orderNumber}")
    public ResponseEntity<OrdersResponse> getOrderByNumber(@PathVariable String orderNumber) {
        log.debug("REQUEST ORDER BY NUMBER → {}", orderNumber);
        OrdersResponse response = orderService.getOrderByNumber(orderNumber);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/employee/order/getall")
    public ResponseEntity<List<OrdersResponse>> getAllOrders() {
        log.info("REQUEST ALL ORDERS LIST (ADMIN)");
        List<OrdersResponse> orders = orderService.getAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/customer/order/{customerId}")
    public ResponseEntity<List<OrdersResponse>> getOrdersByCustomer(@PathVariable UUID customerId) {
        log.info("REQUEST ORDERS BY CUSTOMER → {}", customerId);
        List<OrdersResponse> orders = orderService.getOrdersByCustomer(customerId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/customer/order/{orderId}/cancel")
    public ResponseEntity<Void> cancelOrder(@PathVariable UUID orderId) {
        log.info("REQUEST CANCEL ORDER → {}", orderId);
        orderService.cancelOrder(orderId);
        log.info("ORDER CANCELLED SUCCESS → {}", orderId);
        return ResponseEntity.noContent().build();
    }
}