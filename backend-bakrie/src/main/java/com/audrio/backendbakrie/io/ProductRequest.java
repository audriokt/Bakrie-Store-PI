package com.audrio.backendbakrie.io;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    @NotBlank(message = "Nama produk tidak boleh kosong")
    private String product_name;

    @Positive(message = "Harga produk harus lebih dari 0")
    private double product_price;

    @NotBlank(message = "Deskripsi produk tidak boleh kosong")
    @Size(max = 500, message = "Deskripsi maksimal 500 karakter")
    private String description;

    @Positive(message = "Stok produk harus lebih dari 0")
    private int product_stock;

    @NotBlank(message = "URL gambar produk wajib diisi")
    private String image_url;

}
