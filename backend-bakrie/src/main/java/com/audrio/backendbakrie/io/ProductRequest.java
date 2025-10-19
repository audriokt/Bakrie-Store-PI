package com.audrio.backendbakrie.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String product_name;
    private double product_price;
    private String description;
    private int product_stock;
    private String image_url;
}
