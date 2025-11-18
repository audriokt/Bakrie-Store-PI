package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;

import java.util.UUID;

public interface CartService {
    void recalculateTotal(Carts cart);
    void deleteCart(Carts cart);
    Carts getCartByCustomerId(Customers customer);
}
