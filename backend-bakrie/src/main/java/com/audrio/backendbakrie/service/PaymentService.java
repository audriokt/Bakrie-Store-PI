// src/main/java/com/audrio/backendbakrie/service/PaymentService.java

package com.audrio.backendbakrie.service;

import java.util.Map;

/**
 * Service untuk integrasi pembayaran Midtrans Snap
 */
public interface PaymentService {

    /**
     * Membuat token transaksi Midtrans Snap
     *
     * @param transactionDetails Map berisi:
     *                           - transaction_details (order_id + gross_amount)
     *                           - item_details (WAJIB untuk Snap)
     *                           - customer_details (opsional tapi sangat disarankan)
     *                           - dll (enabled_payments, callbacks, dll)
     * @return String token untuk window.snap.pay(token)
     * @throws RuntimeException jika gagal membuat token
     */
    String createTransactionToken(Map<String, Object> transactionDetails);

    /**
     * Method overload untuk backward compatibility / kemudahan penggunaan
     *
     * @param orderId  nomor order (harus unik)
     * @param amount   total amount dalam Double (contoh: 175000.0)
     * @return token Midtrans
     */
    String createTransactionToken(String orderId, Double amount);
}