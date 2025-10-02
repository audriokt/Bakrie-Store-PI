package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;
import java.util.List;

@Builder
@Data

public class OrdersRequest {

    private UUID customerId;
    private UUID employeeId;
    private String deliverAddress;
    private String orderNumber;
    private String orderStatus;
    private List<OrderDetailRequest> orderDetails;
}
