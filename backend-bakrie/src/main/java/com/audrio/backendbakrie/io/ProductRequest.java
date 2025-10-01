package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductRequest {
    private String product_name;
    private double product_price;
    private String description;
    private int product_stock;
    private String image_url;
}
