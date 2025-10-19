package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface CustomerService {
    CustomerResponse add(CustomerRequest request, MultipartFile file);
    CustomerResponse update(UUID id, CustomerRequest request);
    void delete(UUID id);
    List<CustomerResponse> getAll();
    boolean verifyEmail(String token);
}
