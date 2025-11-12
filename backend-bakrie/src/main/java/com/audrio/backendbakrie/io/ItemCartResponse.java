package com.audrio.backendbakrie.io;

import lombok.Builder;

import java.util.UUID;

@Builder
public class ItemCartResponse {
    private UUID iteCartId;
    private UUID productId;
    private String productName;
    private String productImgUrl;
    private int quantity;
    private double totalPrice;
}
