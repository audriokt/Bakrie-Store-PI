package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.service.EmailService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendVerificationEmail(String to, String token) {
        String subject = "Verifikasi Email Anda";
        String verificationLink = "http://localhost:8080/customers/verify?token=" + token;
        String body = "Klik tautan berikut untuk verifikasi email Anda:\n" + verificationLink;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}