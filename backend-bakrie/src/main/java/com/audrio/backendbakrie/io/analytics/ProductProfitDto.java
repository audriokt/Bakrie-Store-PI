package com.audrio.backendbakrie.io.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductProfitDto {
    private Long productId;
    private String productName;
    private Long qtySold;
    private Double revenue;
    private Double grossProfit;
    private Double profitMargin; // %
}
