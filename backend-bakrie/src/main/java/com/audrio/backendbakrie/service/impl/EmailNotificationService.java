package com.audrio.backendbakrie.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {
    private final JavaMailSender mailSender;

    public EmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOrderStatusEmail(String to, String orderId, String status) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Status Pesanan #" + orderId);
        message.setText("Halo pelanggan,\n\n" +
                "Pesanan Anda dengan ID " + orderId + " saat ini berstatus: " + status + ".\n\n" +
                "Terima kasih telah berbelanja bersama kami.\n\nSalam,\nTim Support");

        mailSender.send(message);
    }
}