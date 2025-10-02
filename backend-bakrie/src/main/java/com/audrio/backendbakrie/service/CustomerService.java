package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;

import java.util.List;
import java.util.UUID;

public interface CustomerService {
    CustomerResponse Add(CustomerRequest request);
    CustomerResponse update(UUID id, CustomerRequest request);
    void delete(UUID id);
    List<CustomerResponse> getAll();
}
