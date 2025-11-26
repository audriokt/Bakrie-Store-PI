package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ItemCartResponse {
    private UUID itemCartId;
    private UUID productId;
    private String productName;
    private String productImgUrl;
    private int quantity;
    private double subPrice;
}
