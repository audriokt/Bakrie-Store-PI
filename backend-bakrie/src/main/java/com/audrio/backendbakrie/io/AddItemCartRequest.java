package com.audrio.backendbakrie.io;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class AddItemCartRequest {
    private UUID productId;

    @Min(1)
    private int quantity;
}
