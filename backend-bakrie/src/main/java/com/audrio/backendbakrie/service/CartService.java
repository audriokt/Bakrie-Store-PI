package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Carts;

import java.util.UUID;

public interface CartService {
    public void recalculateTotal(Carts cart);
    public void deleteCart(Carts cart);
    public Carts getCartByCustomerId(UUID customerId);
}
