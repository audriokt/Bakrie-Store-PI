package com.audrio.backendbakrie.events;

import org.springframework.context.ApplicationEvent;

public class OrderStatusChangedEvent extends ApplicationEvent {
    private final String orderId;
    private final String customerEmail;
    private final String status;

    public OrderStatusChangedEvent(String orderId, String customerEmail, String status) {
        super(customerEmail);
        this.orderId = orderId;
        this.customerEmail = customerEmail;
        this.status = status;
    }

    public String getOrderId() { return orderId; }
    public String getCustomerEmail() { return customerEmail; }
    public String getStatus() { return status; }
}
