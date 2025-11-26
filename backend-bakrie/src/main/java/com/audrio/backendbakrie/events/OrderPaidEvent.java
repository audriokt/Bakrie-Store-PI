package com.audrio.backendbakrie.events;

import com.audrio.backendbakrie.entity.Orders;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class OrderPaidEvent extends ApplicationEvent {
    private final Orders order;

    public OrderPaidEvent(Object source, Orders order) {
        super(source);
        this.order = order;
    }
}
