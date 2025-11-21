package com.audrio.backendbakrie.io;

import lombok.*;

import java.util.UUID;

@Data
@Builder
public class UpdateItemRequest {
    private UUID itemCartId;
    private int quantity;
}
