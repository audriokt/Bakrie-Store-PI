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
        validateRequest(request, file);

        String email = request.getEmail().trim();
        Optional<Customers> optionalCustomer = customerRepository.findByEmail(email);

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("purpose", "email-verification");
        String token = jwtUtils.generateToken(claims, email);

        if (optionalCustomer.isPresent()) {
            Customers existing = optionalCustomer.get();
            if (existing.getIs_verified()) {
                throw new UserAlreadyVerifiedException("Email sudah terverifikasi");
            }
            existing.setVerificationToken(token);
            customerRepository.save(existing);
            emailService.sendVerificationEmail(existing.getEmail(), token);
            return convertToResponse(existing); // ← RETURN, JANGAN THROW!
        }

        // Upload file
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new ImageSizeUnaproriateException("File maksimal 5MB");
        }
        if (!file.getContentType().startsWith("image/")) {
            throw new ImageInvalidExtentionException("Hanya file gambar");
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
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer tidak ditemukan: " + id));

        customer.setUsername(request.getUsername().trim());
        customer.setEmail(request.getEmail().trim());
        customer.setAddress(request.getAddress().trim());
        customer.setPhone_num(request.getPhone_num().trim());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            customer.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        customerRepository.save(customer);
        return convertToResponse(customer);
    }

    @Override
    public void delete(UUID id) {
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer tidak ditemukan: " + id));

        if (customer.getImg_url() != null) {
            cloudinaryService.deleteFile(customer.getImg_url());
        }

        customerRepository.delete(customer);
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
        if (token == null || token.isBlank()) {
            return ResponseEntity.badRequest().body("Token tidak boleh kosong");
        }

        String email = jwtUtils.extractEmail(token);
        if (email == null) {
            return ResponseEntity.badRequest().body("Token tidak valid");
        }

        String purpose = jwtUtils.extractClaim(token, claims -> claims.get("purpose", String.class));
        if (!"email-verification".equals(purpose)) {
            return ResponseEntity.badRequest().body("Token bukan untuk verifikasi email");
        }

        Customers customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new CustomerNotFoundException("Customer tidak ditemukan"));

        if (!token.equals(customer.getVerificationToken())) {
            return ResponseEntity.badRequest().body("Token verifikasi tidak cocok");
        }

        customer.setIs_verified(true);
        customer.setVerificationToken(null); // hapus token
        customerRepository.save(customer);

        return ResponseEntity.ok("Email berhasil diverifikasi");
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
        if (request == null) throw new RequestShouldntEmptyException("Request tidak boleh null");

        // Email
        String email = request.getEmail();
        if (email == null || !email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            throw new EmailNotValidException("Format email tidak valid");
        }

        // Password
        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new PasswordMinLengthException("Password minimal 8 karakter");
        }

        // Username
        String username = request.getUsername();
        if (username == null || username.trim().isEmpty()) {
            throw new UsernameShouldntBlankException("Username tidak boleh kosong");
        }
        username = username.trim();
        if (username.length() < 8 || username.length() > 32) {
            throw new UsernameInvalidLengthException("Username 8-32 karakter");
        }
        if (!username.matches("^[a-zA-Z]+$")) {
            throw new UsernameContainNumberOrDigitsException("Username hanya huruf");
        }

        // Phone
        String phone = request.getPhone_num();
        if (phone == null || phone.trim().isEmpty()) {
            throw new PhoneNumberShouldntBlankException("Nomor telepon wajib diisi");
        }
        phone = phone.trim();
        if (!phone.matches("^\\+?\\d{10,15}$")) {
            throw new PhoneNumberNotValidException("Nomor telepon harus 10-15 digit");
        }

        // Address
        String address = request.getAddress();
        if (address == null || address.trim().isEmpty()) {
            throw new AddressShouldntBlankException("Alamat wajib diisi");
        }
        address = address.trim();
        if (address.length() < 10 || address.length() > 255) {
            throw new AddressInvalidLengthException("Alamat 10-255 karakter");
        }

        // File
        if (file == null || file.isEmpty()) {
            throw new ImageFileEmptyException("File gambar wajib diisi");
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new ImageSizeUnaproriateException("File maksimal 5MB");
        }
        if (!file.getContentType().startsWith("image/")) {
            throw new ImageInvalidExtentionException("Hanya file gambar yang diizinkan");
        }
    }
}