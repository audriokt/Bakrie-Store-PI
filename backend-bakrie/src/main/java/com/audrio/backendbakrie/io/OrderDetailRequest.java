package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data

public class OrderDetailRequest {
        private UUID productId;
        private UUID cartId;
        private int quantity;
    }