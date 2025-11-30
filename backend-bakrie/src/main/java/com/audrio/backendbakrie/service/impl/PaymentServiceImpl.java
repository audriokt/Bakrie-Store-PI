package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.service.PaymentService;
import com.midtrans.Config;
import com.midtrans.ConfigFactory;
import com.midtrans.httpclient.error.MidtransError;
import com.midtrans.service.MidtransSnapApi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    @Value("${midtrans.server-key}")
    private String serverKey;

    @Value("${midtrans.client-key}")
    private String clientKey;

    @Value("${midtrans.is-production:false}")
    private boolean isProduction;

    @Override
    public String createTransactionToken(Map<String, Object> transactionDetails) {
        try {
            // Konfigurasi Midtrans pakai Config Builder (wajib untuk v3.0.0+)
            Config config = Config.builder()
                    .setServerKey(serverKey)
                    .setClientKey(clientKey)
                    .setIsProduction(isProduction)
                    .build();

            // Buat instance SnapApi dari Config
            MidtransSnapApi snapApi = new ConfigFactory(config).getSnapApi();

            log.info("Midtrans Config v3.0.0 → Production: {}, ServerKey: {}",
                    isProduction, serverKey != null ? "SET" : "NULL");

            // Buat token
            String token = snapApi.createTransactionToken(transactionDetails);
            log.info("Token Midtrans berhasil dibuat untuk order: {}",
                    ((Map<?, ?>) transactionDetails.get("transaction_details")).get("order_id"));
            return token;

        } catch (MidtransError e) {
            log.error("Midtrans Error (v3.0.0): {}", e.getMessage());
            throw new RuntimeException("Gagal membuat token pembayaran Midtrans: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Error tak terduga saat buat token Midtrans v3.0.0", e);
            throw new RuntimeException("Sistem pembayaran sedang bermasalah", e);
        }
    }

    // Optional: method lama untuk backward compatibility
    public String createTransactionToken(String orderId, Double amount) {
        Map<String, Object> details = new HashMap<>();
        Map<String, Object> tx = new HashMap<>();
        tx.put("order_id", orderId);
        tx.put("gross_amount", amount);
        details.put("transaction_details", tx);

        return createTransactionToken(details);
    }
}