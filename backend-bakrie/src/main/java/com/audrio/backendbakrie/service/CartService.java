package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.CartRequest;
import com.audrio.backendbakrie.io.CartResponse;

import java.util.List;
import java.util.UUID;

public interface CartService {
    CartResponse createCart(CartRequest request);
    CartResponse getCartById(UUID id);
    List<CartResponse> getAllCarts();
    CartResponse updateCart(UUID id, CartRequest request);
    void deleteCart(UUID id);
}