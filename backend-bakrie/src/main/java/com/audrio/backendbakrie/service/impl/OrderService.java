package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.OrderRequest;
import com.audrio.backendbakrie.io.OrderResponse;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    List<OrderResponse> getAllOrders();
    OrderResponse getOrderById(UUID id);
    OrderResponse updateOrder(UUID id, OrderRequest request);
    void deleteOrder(UUID id);
}

