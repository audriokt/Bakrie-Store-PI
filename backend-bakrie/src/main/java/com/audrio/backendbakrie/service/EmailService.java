package com.audrio.backendbakrie.service;

public interface EmailService {
    void sendVerificationEmail(String to, String token);
}

