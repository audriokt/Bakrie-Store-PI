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
    private String orderNumber;
    private Timestamp orderDate;
    private UUID customerId;
    private String deliverAddress;
    private String orderStatus;
    private double totalPrice;
    private List<OrderDetailRequest> orderDetails;
}

