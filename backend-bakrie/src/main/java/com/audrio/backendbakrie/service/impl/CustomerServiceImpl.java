package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.Repository.CustomerRepository;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.service.CloudinaryService;
import com.audrio.backendbakrie.service.CustomerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.audrio.backendbakrie.utils.ExceptionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public CustomerResponse Add(CustomerRequest request, MultipartFile file) {
        String id =  UUID.randomUUID().toString();
        String imgUrl = cloudinaryService.uploadFile(file, id).getUrl();
        Customers newCustomer =  convertToEntity(request);
        newCustomer.setImg_url(imgUrl);
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

        Customers updated = customerRepository.findByIdCustomer(id)
                .orElseThrow(() -> new ExceptionUtils(ExceptionUtils.CUSTOMER_NOT_FOUND));

        return convertToResponse(updated);
    }

    @Override
    public void delete(UUID id) {
        Customers existingCustomer = customerRepository.findByIdCustomer(id)
                .orElseThrow(() -> new ExceptionUtils(ExceptionUtils.CUSTOMER_NOT_FOUND));
        customerRepository.delete(existingCustomer);
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
                .customer_id(newCustomer.getIdCustomer().toString())
                .phone_num(newCustomer.getPhone_num())
                .address(newCustomer.getAddress())
                .email(newCustomer.getEmail())
                .username(newCustomer.getUsername())
                .img_url(newCustomer.getImg_url())
                .created_at(newCustomer.getCreated_at())
                .updated_at(newCustomer.getUpdated_at())
                .build();
    }

    private Customers convertToEntity(CustomerRequest request) {
        return Customers.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .address(request.getAddress())
                .email(request.getEmail())
                .phone_num(request.getPhone_num())
                .img_url(request.getImg_url())
                .build();
    }
}
