package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface CustomerService {
    CustomerResponse add(CustomerRequest request);

    CustomerResponse update(UUID id, UpdateProfileCusRequest request, MultipartFile file);

    void delete(UUID id);

    List<CustomerResponse> getAll();

    ResponseEntity<String> verifyEmail(String token);

    AuthResponse login(CustomerAuthRequest request);

    CustomerResponse customerProfile(String token);

    UserDetails getCurrentCustomer();

    ResponseEntity<String> forgotPassword(ForgotPasswordRequest request);
    ResponseEntity<String> resetPassword(ResetPasswordRequest request);
    boolean isResetTokenValid(String token);
}
