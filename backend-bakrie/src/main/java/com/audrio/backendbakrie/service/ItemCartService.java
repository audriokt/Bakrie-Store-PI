package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.io.AddItemCartRequest;
import com.audrio.backendbakrie.io.CartRequest;
import com.audrio.backendbakrie.io.CartResponse;

import java.util.UUID;

public interface ItemCartService {
    public CartResponse addItemToCart(AddItemCartRequest cartRequest);
    public void removeItemFromCartIfOwnedByUser(String itemCartId);
    public void updateItemQuantity(UUID itemCartId, int newQuantity);
}
