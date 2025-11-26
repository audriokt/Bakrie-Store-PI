package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CartResponse;

import java.util.UUID;

public interface CartService {
    void recalculateTotal(Carts cart);
    void deleteCart(String customerId);
    CartResponse getCartByCustomerId(String customerId);
}
