package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.OrdersRequest;
import com.audrio.backendbakrie.io.OrdersResponse;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrdersResponse createOrder(OrdersRequest request);
    OrdersResponse getOrderById(UUID orderId);
    List<OrdersResponse> getAllOrders();
    OrdersResponse cancelOrder(UUID orderId);
}