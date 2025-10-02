package com.audrio.backendbakrie.io;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class CartRequest {
    private LocalDate createdAt;
    private LocalDate updatedAt;
}

