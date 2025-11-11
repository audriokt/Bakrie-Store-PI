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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
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
        log.info("=== ADD CUSTOMER START ===");
        log.debug("Request: {}", request);
        log.debug("File: {} (size: {} bytes)", file.getOriginalFilename(), file.getSize());

        validateRequest(request, file);

        String email = request.getEmail().trim();
        log.debug("Checking email existence: {}", email);
        Optional<Customers> optionalCustomer = customerRepository.findByEmail(email);

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("purpose", "email-verification");
        String token = jwtUtils.generateToken(claims, email);
        log.debug("Generated verification token (first 20 chars): {}", token.length() > 20 ? token.substring(0, 20) + "..." : token);

        if (optionalCustomer.isPresent()) {
            Customers existing = optionalCustomer.get();
            log.info("Customer already exists: {}", existing.getEmail());

            if (existing.getIs_verified()) {
                log.warn("Attempt to re-register verified email: {}", email);
                throw new UserAlreadyVerifiedException("Email sudah terverifikasi");
            }

            log.info("Updating verification token for existing unverified user");
            existing.setVerificationToken(token);
            customerRepository.save(existing);
            emailService.sendVerificationEmail(existing.getEmail(), token);
            log.info("Verification email resent to: {}", email);
            return convertToResponse(existing);
        }

        log.debug("Validating file size and type");
        if (file.getSize() > 5 * 1024 * 1024) {
            log.warn("File too large: {} bytes", file.getSize());
            throw new ImageSizeUnaproriateException("File maksimal 5MB");
        }
        if (!file.getContentType().startsWith("image/")) {
            log.warn("Invalid file type: {}", file.getContentType());
            throw new ImageInvalidExtentionException("Hanya file gambar");
        }

        String idImg = UUID.randomUUID().toString();
        log.debug("Uploading image to Cloudinary with ID: {}", idImg);
        String imgUrl = cloudinaryService.uploadFile(file, idImg).getUrl();
        log.debug("Image uploaded successfully: {}", imgUrl);

        Customers newCustomer = convertToEntity(request);
        newCustomer.setPassword(passwordEncoder.encode(request.getPassword()));
        newCustomer.setImg_url(imgUrl);
        newCustomer.setVerificationToken(token);
        newCustomer.setIs_verified(false);

        newCustomer = customerRepository.save(newCustomer);
        log.info("New customer saved with ID: {}", newCustomer.getIdCustomer());

        emailService.sendVerificationEmail(newCustomer.getEmail(), token);
        log.info("Verification email sent to: {}", newCustomer.getEmail());

        log.info("ADD CUSTOMER SUCCESS");
        return convertToResponse(newCustomer);
    }

    @Override
    @Transactional
    public CustomerResponse update(UUID id, CustomerRequest request) {
        log.info("UPDATE CUSTOMER START | ID: {}", id);
        log.debug("Update request: {}", request);

        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Customer not found for update: {}", id);
                    return new CustomerNotFoundException("Customer tidak ditemukan: " + id);
                });

        customer.setUsername(request.getUsername().trim());
        customer.setEmail(request.getEmail().trim());
        customer.setAddress(request.getAddress().trim());
        customer.setPhone_num(request.getPhone_num().trim());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            log.debug("Updating password for customer: {}", id);
            customer.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        customerRepository.save(customer);
        log.info("Customer updated successfully: {}", id);
        log.info("UPDATE CUSTOMER SUCCESS");
        return convertToResponse(customer);
    }

    @Override
    public void delete(UUID id) {
        log.info("DELETE CUSTOMER START | ID: {}", id);

        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Customer not found for deletion: {}", id);
                    return new CustomerNotFoundException("Customer tidak ditemukan: " + id);
                });

        if (customer.getImg_url() != null) {
            log.debug("Deleting image from Cloudinary: {}", customer.getImg_url());
            cloudinaryService.deleteFile(customer.getImg_url());
        }

        customerRepository.delete(customer);
        log.info("Customer deleted successfully: {}", id);
        log.info("DELETE CUSTOMER SUCCESS");
    }

    @Override
    public List<CustomerResponse> getAll() {
        log.info("GET ALL CUSTOMERS START");
        List<Customers> customers = customerRepository.findAll();
        log.debug("Found {} customers", customers.size());
        List<CustomerResponse> responses = customers.stream()
                .map(this::convertToResponse)
                .toList();
        log.info("GET ALL CUSTOMERS SUCCESS | Count: {}", responses.size());
        return responses;
    }

    @Override
    public ResponseEntity<String> verifyEmail(String token) {
        log.info("VERIFY EMAIL START");
        log.debug("Verification token (first 20 chars): {}", token != null && token.length() > 20 ? token.substring(0, 20) + "..." : token);

        if (token == null || token.isBlank()) {
            log.warn("Verification token is empty");
            return ResponseEntity.badRequest().body("Token tidak boleh kosong");
        }

        String email = jwtUtils.extractEmail(token);
        if (email == null) {
            log.warn("Failed to extract email from token");
            return ResponseEntity.badRequest().body("Token tidak valid");
        }
        log.debug("Extracted email from token: {}", email);

        String purpose = jwtUtils.extractClaim(token, claims -> claims.get("purpose", String.class));
        if (!"email-verification".equals(purpose)) {
            log.warn("Token purpose invalid: {}", purpose);
            return ResponseEntity.badRequest().body("Token bukan untuk verifikasi email");
        }

        Customers customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("Customer not found during email verification: {}", email);
                    return new CustomerNotFoundException("Customer tidak ditemukan");
                });

        if (!token.equals(customer.getVerificationToken())) {
            log.warn("Verification token mismatch for user: {}", email);
            return ResponseEntity.badRequest().body("Token verifikasi tidak cocok");
        }

        customer.setIs_verified(true);
        customer.setVerificationToken(null);
        customerRepository.save(customer);
        log.info("Email verified successfully: {}", email);

        log.info("VERIFY EMAIL SUCCESS");
        return ResponseEntity.ok("Email berhasil diverifikasi");
    }

    @Override
    public AuthResponse login(CustomerAuthRequest request) {
        log.info("CUSTOMER LOGIN START | Email: {}", request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        log.debug("Spring Security authentication passed for: {}", request.getEmail());

        Customers customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Customer not found during login: {}", request.getEmail());
                    return new CustomerNotFoundException("Customer not found");
                });

        if (!customer.getIs_verified()) {
            log.warn("Login attempt with unverified email: {}", request.getEmail());
            throw new UserNotVerifiedException("Customer not verified");
        }

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("purpose", "access");
        claims.put("role", customer.getCusRoles().getName());
        String token = jwtUtils.generateToken(claims, customer.getEmail());
        String role = customer.getCusRoles().getName();
        Date expirationTime = jwtUtils.extractExpiration(token);

        log.debug("Access token generated (first 20 chars): {}", token.length() > 20 ? token.substring(0, 20) + "..." : token);
        log.info("Customer login successful: {} | Role: {}", customer.getEmail(), role);
        log.info("CUSTOMER LOGIN SUCCESS");

        return new AuthResponse(token, role, expirationTime);
    }

    public CustomerResponse customerProfile(String token) {
        String pureToken = token.replace("Bearer ", "").trim();
        String email = jwtUtils.extractEmail(pureToken);
        try{
            log.info("GET CUSTOMER PROFILE START | ID: {}");
            System.out.println(email);
            Customers customer = customerRepository.findByEmail(email)
                    .orElseThrow(() -> {
                        log.warn("Customer not found for profile: {}", email);
                        return new CustomerNotFoundException("Customer tidak ditemukan: " + email);
                    });
            log.info("GET CUSTOMER PROFILE SUCCESS");
            return convertToResponse(customer);
        } catch (Exception e) {
            log.error("GET CUSTOMER PROFILE FAILED {}", email);
            throw new CustomerNotFoundException("Customer tidak ditemukan");
        }
    }


    private CustomerResponse convertToResponse(Customers newCustomer) {
        log.debug("Converting entity to response for customer ID: {}", newCustomer.getIdCustomer());
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
        log.debug("Converting request to entity for email: {}", request.getEmail());
        Roles role = rolesRepository.findByName("ROLE_CUSTOMER")
                .orElseThrow(() -> {
                    log.error("ROLE_CUSTOMER not found in database");
                    return new RoleNotFoundException("Customer Role not found");
                });

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
        log.debug("VALIDATING CUSTOMER REQUEST");
        if (request == null) {
            log.warn("Request is null");
            throw new RequestShouldntEmptyException("Request tidak boleh null");
        }

        // Email
        String email = request.getEmail();
        if (email == null || !email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            log.warn("Invalid email format: {}", email);
            throw new EmailNotValidException("Format email tidak valid");
        }

        // Password
        if (request.getPassword() == null || request.getPassword().length() < 8) {
            log.warn("Password too short: {} chars", request.getPassword() != null ? request.getPassword().length() : 0);
            throw new PasswordMinLengthException("Password minimal 8 karakter");
        }

        // Username
        String username = request.getUsername();
        if (username == null || username.trim().isEmpty()) {
            log.warn("Username is empty");
            throw new UsernameShouldntBlankException("Username tidak boleh kosong");
        }
        username = username.trim();
        if (username.length() < 8 || username.length() > 32) {
            log.warn("Username length invalid: {}", username.length());
            throw new UsernameInvalidLengthException("Username 8-32 karakter");
        }
        if (!username.matches("^[a-zA-Z]+$")) {
            log.warn("Username contains invalid characters: {}", username);
            throw new UsernameContainNumberOrDigitsException("Username hanya huruf");
        }

        // Phone
        String phone = request.getPhone_num();
        if (phone == null || phone.trim().isEmpty()) {
            log.warn("Phone number is empty");
            throw new PhoneNumberShouldntBlankException("Nomor telepon wajib diisi");
        }
        phone = phone.trim();
        if (!phone.matches("^\\+?\\d{10,15}$")) {
            log.warn("Invalid phone format: {}", phone);
            throw new PhoneNumberNotValidException("Nomor telepon harus 10-15 digit");
        }

        // Address
        String address = request.getAddress();
        if (address == null || address.trim().isEmpty()) {
            log.warn("Address is empty");
            throw new AddressShouldntBlankException("Alamat wajib diisi");
        }
        address = address.trim();
        if (address.length() < 10 || address.length() > 255) {
            log.warn("Address length invalid: {}", address.length());
            throw new AddressInvalidLengthException("Alamat 10-255 karakter");
        }

        // File
        if (file == null || file.isEmpty()) {
            log.warn("Image file is empty");
            throw new ImageFileEmptyException("File gambar wajib diisi");
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            log.warn("File too large: {} bytes", file.getSize());
            throw new ImageSizeUnaproriateException("File maksimal 5MB");
        }
        if (!file.getContentType().startsWith("image/")) {
            log.warn("Invalid file type: {}", file.getContentType());
            throw new ImageInvalidExtentionException("Hanya file gambar yang diizinkan");
        }

        log.debug("VALIDATION PASSED");
    }
}