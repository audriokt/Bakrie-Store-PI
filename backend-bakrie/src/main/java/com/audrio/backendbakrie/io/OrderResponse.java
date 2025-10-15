package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
public class OrderResponse {
    private UUID id_customer;
    private UUID id_order;
    private String id_employee;
    private String deliver_address;
    private String order_number;
    private Timestamp order_date;
    private String order_status;
}
