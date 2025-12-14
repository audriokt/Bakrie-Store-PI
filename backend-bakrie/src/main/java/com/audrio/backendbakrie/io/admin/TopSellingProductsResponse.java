package com.audrio.backendbakrie.io.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopSellingProductsResponse {
    // Field sesuai entity Products
    private String id_product;        // akan diisi dengan UUID.toString()
    private String product_name;
    private double product_price;
    private String description;
    private int product_stock;
    private String image_url;
    private Timestamp created_at;
    private Timestamp updated_at;

    // Hasil agregasi penjualan
    private Long totalSold;
}