package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.Repository.CustomerRepository;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final EmailService emailService;

    @Override
    public CustomerResponse add(CustomerRequest request) {
        String token = UUID.randomUUID().toString();
        Customers newCustomer =  convertToEntity(request);
        // Tambahkan token dan status verifikasi
        newCustomer.setVerification_token(token);
        newCustomer.setIs_verified(false);

        newCustomer = customerRepository.save(newCustomer);
        // Kirim email verifikasi
        emailService.sendVerificationEmail(newCustomer.getEmail(), token);

        return convertToResponse(newCustomer);
    }

    @Override
    public boolean verifyEmail(String token) {
        Optional<Customers> optionalCustomer = customerRepository.findByVerification_token(token);
        if (optionalCustomer.isPresent()) {
            Customers customer = optionalCustomer.get();
            customer.setIs_verified(true);
            customer.setVerification_token(null);
            customerRepository.save(customer);
            return true;
        }
        return false;
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
