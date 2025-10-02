package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
public class OrderRequest {
    private UUID idCustomer;
    private UUID idEmployee;
    private String deliverAddress;
    private String orderNumber;
    private Timestamp orderDate;
    private String orderStatus;
}
