package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Orders;
import com.audrio.backendbakrie.io.OrdersRequest;
import com.audrio.backendbakrie.io.OrdersResponse;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrdersResponse createOrder(OrdersRequest request);
    OrdersResponse updateStatus(UUID id, Orders.OrderStatus request);
    List<OrdersResponse> getAll();
    OrdersResponse getOrderById(UUID id);
    OrdersResponse getOrderByNumber(String orderNumber);
    List<OrdersResponse> getOrdersByCustomer(UUID customerId);
    void cancelOrder(UUID orderId);
}