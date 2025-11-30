package com.audrio.backendbakrie.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data @Builder @AllArgsConstructor
public class   OrdersResponse {
    private UUID idOrder;
    private String orderNumber;
    private LocalDateTime orderDate;
    private String orderStatus;
    private String deliverAddress;
    private Double totalAmount;
    private String transactionToken;
    private UUID customerId;
    private List<OrderDetailResponse> orderDetails;
}

