package com.audrio.backendbakrie.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class OrderDetailResponse {
    private UUID productId;
    private String productName;
    private int quantity;
    private double unitPrice;
    private double subtotal;
}
