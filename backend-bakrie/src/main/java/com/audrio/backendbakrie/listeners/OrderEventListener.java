package com.audrio.backendbakrie.listeners;

import com.audrio.backendbakrie.entity.Orders;
import com.audrio.backendbakrie.events.OrderCancelledEvent;
import com.audrio.backendbakrie.events.OrderPendingEvent;
import com.audrio.backendbakrie.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OrderEventListener {

    private final ProductService productService;

    public OrderEventListener(ProductService productService) {
        this.productService = productService;
    }

    // Kurangi stok sementara saat order PENDING
    @EventListener
    public void handleOrderPending(OrderPendingEvent event) {
        Orders order = event.getOrder();
        order.getOrderDetails().forEach(detail -> {
            productService.reduceStock(detail.getProduct().getIdProduct(), detail.getQuantity());
        });
        // bisa tambahkan log
        System.out.println("Stok sementara dikurangi untuk order " + order.getOrderNumber());
    }

    // Kembalikan stok jika order CANCELLED
    @EventListener
    public void handleOrderCancelled(OrderCancelledEvent event) {
        Orders order = event.getOrder();
        order.getOrderDetails().forEach(detail -> {
            productService.restoreStock(detail.getProduct().getIdProduct(), detail.getQuantity());
        });
        System.out.println("Stok dikembalikan untuk order " + order.getOrderNumber());
    }
}

