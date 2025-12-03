package com.audrio.backendbakrie.listeners;

import com.audrio.backendbakrie.events.PasswordResetEvent;
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
public class PasswordResetListener {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Value("${app.frontend.url:https://bakriestore.com}") // ubah sesuai frontend kamu
    private String frontendUrl;

    @Async
    @EventListener
    public void handlePasswordReset(PasswordResetEvent event) {
        try {
            String content = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background:#f9f9f9; border-radius:10px; text-align:center;">
                    <h2 style="color:#d32f2f;">Reset Password Bakrie Store</h2>
                    <p>Kami menerima permintaan untuk mereset password akun Anda.</p>
                    <p>Klik tombol di bawah ini untuk mengatur ulang password (tautan berlaku 15 menit):</p>
                    <a href="%s" style="display:inline-block; margin:20px 0; padding:14px 32px; background:#d32f2f; color:white; text-decoration:none; border-radius:6px; font-size:16px;">
                        Reset Password
                    </a>
                    <p style="color:#777; font-size:14px;">Abaikan email ini jika Anda tidak merasa melakukan permintaan reset.</p>
                    <hr style="margin-top:30px; border:none; border-top:1px solid #eee;">
                    <small style="color:#aaa;">© 2025 Bakrie Store. All rights reserved.</small>
                </div>
                """.formatted(event.getResetUrl());

            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, true);
            helper.setTo(event.getEmail());
            helper.setSubject("Permintaan Reset Password - Bakrie Store");
            helper.setFrom(from);
            helper.setText(content, true);

            mailSender.send(mime);
            System.out.println("Email reset password terkirim ke: " + event.getEmail());
        } catch (Exception e) {
            System.err.println("GAGAL kirim email reset password: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
