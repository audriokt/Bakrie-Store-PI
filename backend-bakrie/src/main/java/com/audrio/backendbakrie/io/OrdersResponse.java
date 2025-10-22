package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class OrdersResponse {

    private UUID idOrder;
    private UUID customerId;
    private UUID employeeId;
    private String deliverAddress;
    private String orderNumber;
    private Timestamp orderDate;
    private String orderStatus;
    private List<OrderDetailRequest> orderDetails;
}

