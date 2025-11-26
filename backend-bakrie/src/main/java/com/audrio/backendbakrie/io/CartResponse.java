package com.audrio.backendbakrie.io;

import com.audrio.backendbakrie.entity.Item_Carts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class CartResponse {
    private String cartId;
    private String customerId;
    private double totalPrice;
    private List<ItemCartResponse> item_carts;
}
