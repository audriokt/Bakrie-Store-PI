package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;

public interface CustomerService {
    CustomerResponse add(CustomerRequest request);
}
