package com.audrio.backendbakrie.io;

import com.audrio.backendbakrie.entity.Item_Carts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Builder
@Data
public class CartResponse {
    private UUID cartId;
    private UUID customerId;
    private double totalPrice;
    private List<Item_Carts> item_carts;
}
