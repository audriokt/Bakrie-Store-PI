package com.audrio.backendbakrie.io;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class AddItemCartRequest {
    @NotNull(message = "ID produk wajib diisi")
    private UUID productId;

    @Min(value = 1, message = "Jumlah produk minimal 1")
    private int quantity;
}
