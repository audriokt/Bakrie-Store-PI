package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.Repository.CustomerRepository;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.service.CustomerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public CustomerResponse add(CustomerRequest request) {
        Customers newCustomer =  convertToEntity(request);
        newCustomer = customerRepository.save(newCustomer);
        return convertToResponse(newCustomer);
    }

    @Override
    @Transactional
    public CustomerResponse update(UUID id, CustomerRequest request) {
        customerRepository.updateCustomerFields(
                id,
                request.getUsername(),
                request.getPassword(),
                request.getAddress(),
                request.getEmail(),
                request.getPhone_num()
        );

        Customers updated = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found after update"));

        return convertToResponse(updated);
    }

    @Override
    public void delete(UUID id) {
        Customers existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        customerRepository.delete(existingCustomer);
    }

    @Override
    public CustomerResponse findById(UUID id) {
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return convertToResponse(customer);
    }

    @Override
    public List<CustomerResponse> getAll() {
        List<Customers> customers = customerRepository.findAll();
        return customers.stream()
                .map(this::convertToResponse)
                .toList();
    }

    private CustomerResponse convertToResponse(Customers newCustomer) {
        return CustomerResponse.builder()
                .customer_id(newCustomer.getId_customer().toString())
                .phone_num(newCustomer.getPhone_num())
                .address(newCustomer.getAddress())
                .email(newCustomer.getEmail())
                .username(newCustomer.getUsername())
                .created_at(newCustomer.getCreated_at())
                .updated_at(newCustomer.getUpdated_at())
                .build();
    }

    private Customers convertToEntity(CustomerRequest request) {
        return Customers.builder()
                .id_customer(UUID.randomUUID())
                .username(request.getUsername())
                .address(request.getAddress())
                .email(request.getEmail())
                .phone_num(request.getPhone_num())
                .build();
    }
}
