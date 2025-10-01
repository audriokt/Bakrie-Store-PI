package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;

import java.util.List;
import java.util.UUID;

public interface CustomerService {
    CustomerResponse add(CustomerRequest request);
    CustomerResponse update(UUID id, CustomerRequest request);
    void delete(UUID id);
    CustomerResponse findById(UUID id);
    List<CustomerResponse> getAll();
}
