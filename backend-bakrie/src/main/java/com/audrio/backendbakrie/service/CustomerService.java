package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.AuthResponse;
import com.audrio.backendbakrie.io.CustomerAuthRequest;
import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface CustomerService {
    CustomerResponse add(CustomerRequest request);
    CustomerResponse update(UUID id, CustomerRequest request, MultipartFile file);
    void delete(UUID id);
    List<CustomerResponse> getAll();
    ResponseEntity<String> verifyEmail(String token);
    AuthResponse login(CustomerAuthRequest request);
    CustomerResponse customerProfile(String token);
}
