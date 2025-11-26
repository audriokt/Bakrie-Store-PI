package com.audrio.backendbakrie.listeners;

import com.audrio.backendbakrie.events.OrderStatusChangedEvent;
import com.audrio.backendbakrie.service.impl.EmailNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class OrderStatusListener {
    private final EmailNotificationService emailService;

    public OrderStatusListener(EmailNotificationService emailService) {
        this.emailService = emailService;
    }

    @EventListener
    public void handleOrderStatusChanged(OrderStatusChangedEvent event) {
        emailService.sendOrderStatusEmail(
                event.getCustomerEmail(),
                event.getOrderId(),
                event.getStatus()
        );
    }

}
