package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.service.CloudinaryService;
import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.audrio.backendbakrie.utils.ExceptionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CloudinaryService cloudinaryService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public CustomerResponse add(CustomerRequest request, MultipartFile file) {
        String idImg =  UUID.randomUUID().toString();
        String imgUrl = cloudinaryService.uploadFile(file, idImg).getUrl();
        String token = UUID.randomUUID().toString();

        Customers existingCustomer = customerRepository.findByEmail(request.getEmail());
        if(existingCustomer != null){
            if(existingCustomer.getIs_verified()){
                throw new ExceptionUtils(ExceptionUtils.CUSTOMER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }else{
                existingCustomer.setVerification_token(token);
                customerRepository.save(existingCustomer);
                //Send email
                return convertToResponse(existingCustomer);
            }
        }
        Customers newCustomer =  convertToEntity(request);

        newCustomer.setPassword(passwordEncoder.encode(request.getPassword()));
        newCustomer.setImg_url(imgUrl);
        newCustomer.setVerification_token(token);
        newCustomer.setIs_verified(false);

        newCustomer = customerRepository.save(newCustomer);
        // Kirim email verifikasi
        emailService.sendVerificationEmail(newCustomer.getEmail(), token);

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
