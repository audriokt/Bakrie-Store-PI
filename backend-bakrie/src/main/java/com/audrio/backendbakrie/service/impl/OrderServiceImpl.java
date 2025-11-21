package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.io.OrdersRequest;
import com.audrio.backendbakrie.io.OrdersResponse;
import com.audrio.backendbakrie.service.OrderService;

import java.util.List;
import java.util.UUID;

public class OrderServiceImpl implements OrderService {
    @Override
    public OrdersResponse createOrder(OrdersRequest request) {
        return null;
    }

    @Override
    public OrdersResponse getOrderById(UUID orderId) {
        return null;
    }

    @Override
    public List<OrdersResponse> getAllOrders() {
        return List.of();
    }

    @Override
    public OrdersResponse cancelOrder(UUID orderId) {
        return null;
    }
}
