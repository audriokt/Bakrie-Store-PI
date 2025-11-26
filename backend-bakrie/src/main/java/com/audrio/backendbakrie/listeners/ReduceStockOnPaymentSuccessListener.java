package com.audrio.backendbakrie.listeners;

import com.audrio.backendbakrie.entity.OrderDetail;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.events.OrderPaidEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReduceStockOnPaymentSuccessListener {
    @Async // biar tidak memblokir thread utama (opsional tapi direkomendasikan)
    @EventListener
    @Transactional
    public void handleOrderPaidEvent(OrderPaidEvent event) {
        var order = event.getOrder();

        log.info("Mengurangi stok permanen untuk Order {} karena pembayaran berhasil", order.getOrderNumber());

        for (OrderDetail item : order.getOrderDetails()) {
            Products product = item.getProduct();
            int qty = item.getQuantity();

            // Validasi ulang stock (double safety)
            if (product.getProduct_stock() < qty) {
                log.error("STOCK TIDAK CUKUP saat reduce permanent! Product: {} (ID: {}), Dibutuhkan: {}, Tersedia: {}",
                        product.getProduct_name(), product.getIdProduct(), qty, product.getProduct_stock());
                // Bisa kirim notif ke admin / throw exception / kirim event gagal
                continue;
            }

            product.setProduct_stock(product.getProduct_stock() - qty);
            log.info("Stok {} dikurangi {} → tersisa {}",
                    product.getProduct_name(), qty, product.getProduct_stock());
        }
    }
}
