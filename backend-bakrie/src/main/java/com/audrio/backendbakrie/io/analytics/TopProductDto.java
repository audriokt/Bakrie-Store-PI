package com.audrio.backendbakrie.io.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TopProductDto {
    private Long productId;
    private String productName;
    private Long totalQuantity;
    private Long totalOrders;
    private Double totalRevenue;
    private String category; // optional
}