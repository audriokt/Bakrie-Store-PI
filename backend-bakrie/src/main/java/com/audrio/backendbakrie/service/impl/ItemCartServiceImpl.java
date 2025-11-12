package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.service.ItemCartService;

import java.util.UUID;

public class ItemCartServiceImpl implements ItemCartService {
    @Override
    public Carts addItemToCart(UUID customerId, UUID productId, int quantity) {
        return null;
    }

    @Override
    public void removeItemFromCart(UUID itemCartId) {

    }

    @Override
    public void updateItemQuantity(UUID itemCartId, int newQuantity) {

    }
}
