package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Builder
@Data
public class ProductResponse {
    private String id_product;
    private String product_name;
    private double product_price;
    private String description;
    private int product_stock;
    private String image_url;
    private Timestamp created_at;
    private Timestamp updated_at;
}
