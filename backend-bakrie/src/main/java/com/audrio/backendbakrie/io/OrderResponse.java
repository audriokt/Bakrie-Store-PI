package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
public class OrderResponse {
    private UUID idOrder;
    private String orderNumber;
    private String deliverAddress;
    private Timestamp orderDate;
    private String orderStatus;
    private UUID customerId;
    private UUID employeeId;
}
