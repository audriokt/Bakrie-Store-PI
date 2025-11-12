package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Carts;

import java.util.UUID;

public interface ItemCartService {
    public Carts addItemToCart(UUID customerId, UUID productId, int quantity);
    public void removeItemFromCart(UUID itemCartId);
    public void updateItemQuantity(UUID itemCartId, int newQuantity);
}
