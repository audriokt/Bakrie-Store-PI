package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.io.AuthResponse;
import com.audrio.backendbakrie.io.CustomerAuthRequest;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.repository.RolesRepository;
import com.audrio.backendbakrie.roles.Roles;
import com.audrio.backendbakrie.service.CloudinaryService;
import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.EmailService;
import com.audrio.backendbakrie.utils.Exceptions.*;
import com.audrio.backendbakrie.utils.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CloudinaryService cloudinaryService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RolesRepository rolesRepository;
    private final AuthenticationManager authenticationManager;

    @Override
    public CustomerResponse add(CustomerRequest request, MultipartFile file) {
        // Validasi awal
        validateRequest(request, file);

        Optional<Customers> optionalCustomer = customerRepository.findByEmail(request.getEmail());
        HashMap<String,Object> claims = new HashMap<>();
        claims.put("purpose","email-verification");
        String token = jwtUtils.generateToken(claims, request.getEmail());

        if (optionalCustomer.isPresent()) {
            Customers existingCustomer = optionalCustomer.get();

            if (existingCustomer.getIs_verified()) {
                throw new UserAlreadyVerifiedException("Employee with email: " + request.getEmail() + " is already verified");
            }
            existingCustomer.setVerificationToken(token);
            customerRepository.save(existingCustomer);
            emailService.sendVerificationEmail(existingCustomer.getEmail(), token);
            throw new UserNotVerifiedException("User with email: " + request.getEmail() + " not verified. Please check your email");

        }

        String idImg = UUID.randomUUID().toString();
        String imgUrl = cloudinaryService.uploadFile(file, idImg).getUrl();

        Customers newCustomer = convertToEntity(request);
        newCustomer.setPassword(passwordEncoder.encode(request.getPassword()));
        newCustomer.setImg_url(imgUrl);
        newCustomer.setVerificationToken(token);
        newCustomer.setIs_verified(false);

        newCustomer = customerRepository.save(newCustomer);
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
                .orElseThrow(() -> new CustomerNotFoundException("Customer id: " + id + "not found"));

        return convertToResponse(updated);
    }

    @Override
    public void delete(UUID id) {
        Customers existingCustomer = customerRepository.findByIdCustomer(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer id: " + id + "not found"));
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
    public ResponseEntity<String> verifyEmail(String token) {
        String emailString = jwtUtils.extractEmail(token);
        if (emailString == null || emailString.isEmpty()) {
            return new ResponseEntity("Customer Email is Empty", HttpStatus.BAD_REQUEST);
        }

        Customers customer = customerRepository.findByEmail(emailString)
                .orElseThrow(() -> new CustomerNotFoundException("Customer id: " + emailString + "not found"));
        if (customer == null || customer.getVerificationToken() == null) {
            return new ResponseEntity("Customer Verification Token is Empty", HttpStatus.BAD_REQUEST);
        }

        if (!jwtUtils.validateToken(token) || !token.equals(customer.getVerificationToken())) {
            return new ResponseEntity("Customer Verification Token is not valid", HttpStatus.BAD_REQUEST);
        }

        customer.setIs_verified(true);
        customerRepository.save(customer);

        return new  ResponseEntity("Email terverifikasi", HttpStatus.OK);
    }

    @Override
    public AuthResponse login(CustomerAuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Customers customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));

        if(!customer.getIs_verified()) {
            throw new UserNotVerifiedException("Customer not verified");
        }
        
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("purpose","access");
        claims.put("role","ROLE_CUSTOMER");
        String token = jwtUtils.generateToken(claims, customer.getEmail());
        return new AuthResponse(token);
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
        Roles role = rolesRepository.findByName("ROLE_CUSTOMER")
                        .orElseThrow(() -> new RoleNotFoundException("Customer Role not found"));

        return Customers.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .address(request.getAddress())
                .email(request.getEmail())
                .phone_num(request.getPhone_num())
                .img_url(request.getImg_url())
                .cusRoles(role)
                .build();
    }

    private void validateRequest(CustomerRequest request, MultipartFile file) {
        if (request == null) {
            throw new RequestShouldntEmptyException("Request tidak boleh null");
        }

        // ===== Email =====
        if (request.getEmail() == null || !request.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            throw new EmailNotValidException("Email tidak valid");
        }

        // ===== Password =====
        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new PasswordMinLengthException("Password harus minimal 8 karakter");
        }

        // ===== Username =====
        String username = request.getUsername();
        if (username == null || username.trim().isEmpty()) {
            throw new UsernameShouldntBlankException("Nama tidak boleh kosong");
        }
        if (username.length() < 8) {
            throw new UsernameMinLengthException("Username harus minimal 8 karakter");
        }
        if (username.length() > 32) {
            throw new UsernameMaxLengthException("Username maksimal 32 karakter");
        }
        if (username.matches(".*\\d.*") || username.matches(".*[^a-zA-Z0-9].*")) {
            throw new UsernameContainNumberOrDigitsException("Username hanya boleh mengandung huruf");
        }

        // ===== Phone Number =====
        String phone = request.getPhone_num();
        if (phone == null || phone.trim().isEmpty()) {
            throw new PhoneNumberShouldntBlankException("Nomor telepon tidak boleh kosong");
        }
        if (!phone.matches("^\\+?\\d{10,15}$")) {
            throw new PhoneNumberNotValidException("Nomor telepon tidak valid (harus 10–15 digit, boleh diawali +)");
        }

        // ===== Address =====
        String address = request.getAddress();
        if (address == null || address.trim().isEmpty()) {
            throw new AddressShouldntBlankException("Alamat tidak boleh kosong");
        }
        if (address.length() < 10) {
            throw new AddressMinLengthException("Alamat terlalu pendek, minimal 10 karakter");
        }
        if (address.length() > 255) {
            throw new AddressMaxLengthException("Alamat terlalu panjang, maksimal 255 karakter");
        }

        //field file
        if(file.isEmpty()){
            throw new ImageFileEmptyException("File tidak boleh kosong");
        }
    }
}