package com.audrio.backendbakrie.io;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class CartResponse {
    private UUID idCart;
    private UUID customerId;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}

