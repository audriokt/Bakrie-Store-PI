package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class CartRequest {
    private String productId;
    private int quantity;
}
