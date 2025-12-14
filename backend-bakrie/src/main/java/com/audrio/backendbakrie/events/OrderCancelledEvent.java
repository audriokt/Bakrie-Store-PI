package com.audrio.backendbakrie.events;

import com.audrio.backendbakrie.entity.Orders;
import org.springframework.context.ApplicationEvent;

public class OrderCancelledEvent extends ApplicationEvent {
    private final Orders order;

    public OrderCancelledEvent(Object source, Orders order) {
        super(source);
        this.order = order;
    }

    public Orders getOrder() {
        return order;
    }
}

