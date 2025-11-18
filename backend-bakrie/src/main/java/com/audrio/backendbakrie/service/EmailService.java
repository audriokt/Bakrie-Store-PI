package com.audrio.backendbakrie.service;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public interface EmailService {
    void sendVerificationEmail(String to, String token);
    void sendEmpVerificationEmail(@NotNull @Size(max = 100) String email, String token);
}

