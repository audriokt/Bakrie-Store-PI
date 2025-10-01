package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.Repository.CustomerRepository;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.service.CustomerService;
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
    public CustomerResponse update(UUID id, CustomerRequest request) {
        // Cari data customer berdasarkan ID
        Customers existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Update field sesuai data request
        existingCustomer.setUsername(request.getUsername());
        existingCustomer.setEmail(request.getEmail());
        existingCustomer.setPhone_num(request.getPhone_num());
        existingCustomer.setAddress(request.getAddress());

        // Simpan update ke database
        Customers updatedCustomer = customerRepository.save(existingCustomer);
        return convertToResponse(updatedCustomer);
    }

    @Override
    public void delete(UUID id) {
        // Cari customer by ID
        Customers existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Hapus dari database
        customerRepository.delete(existingCustomer);
    }

    @Override
    public CustomerResponse findById(UUID id) {
        // Ambil customer berdasarkan ID
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return convertToResponse(customer);
    }

    @Override
    public List<CustomerResponse> getAll() {
        // Ambil semua customer dari database
        List<Customers> customers = customerRepository.findAll();

        // Convert ke response
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
