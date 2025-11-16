package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.io.CartRequest;
import com.audrio.backendbakrie.io.CartResponse;

import java.util.UUID;

public interface ItemCartService {
    public CartResponse addItemToCart(CartRequest cartRequest, String customerId);
    public void removeItemFromCart(UUID itemCartId);
    public void updateItemQuantity(UUID itemCartId, int newQuantity);
}
