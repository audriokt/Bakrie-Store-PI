package com.audrio.backendbakrie.listeners;

import com.audrio.backendbakrie.events.EmailVerificationEvent;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailVerificationListener {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Async
    @EventListener
    public void handleEmailVerification(EmailVerificationEvent event) {
        try {
            String content = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f9f9f9; text-align: center;">
                    <h2 style="color: #333;">%s</h2>
                    <p style="font-size: 16px; color: #555;">%s</p>
                    <a href="%s" style="display: inline-block; margin: 20px 0; padding: 12px 28px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    <p style="font-size: 14px; color: #777; margin-top: 20px;">Or copy and paste this link:</p>
                    <p style="font-size: 14px; color: #007bff; word-break: break-all;">%s</p>
                    <p style="font-size: 12px; color: #aaa; margin-top: 30px;">This is an automated message. Please do not reply.</p>
                </div>
                """.formatted(
                    event.getSubject(),
                    event.getMessage(),
                    event.getVerificationUrl(),  // PAKAI INI SAJA!
                    event.getVerificationUrl()
            );

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(event.getEmail());
            helper.setSubject(event.getSubject());
            helper.setFrom(from);
            helper.setText(content, true);

            mailSender.send(mimeMessage);

            System.out.println("EMAIL VERIFIKASI TERKIRIM ke: " + event.getEmail());
            System.out.println("Link: " + event.getVerificationUrl());

        } catch (Exception e) {
            System.err.println("GAGAL kirim email ke " + event.getEmail() + ": " + e.getMessage());
            e.printStackTrace(); // penting buat debug!
        }
    }
}