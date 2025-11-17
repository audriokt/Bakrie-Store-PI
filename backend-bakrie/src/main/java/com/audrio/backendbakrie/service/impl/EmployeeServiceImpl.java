package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Employees;
import com.audrio.backendbakrie.io.*;
import com.audrio.backendbakrie.repository.EmployeeRepository;
import com.audrio.backendbakrie.repository.RolesRepository;
import com.audrio.backendbakrie.roles.Roles;
import com.audrio.backendbakrie.service.CloudinaryService;
import com.audrio.backendbakrie.service.EmailService;
import com.audrio.backendbakrie.service.EmployeeService;
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
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final CloudinaryService cloudinaryService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RolesRepository rolesRepository;
    private final AuthenticationManager authenticationManager;

    @Override
    public EmployeeResponse add(EmployeeRequest request) {
        log.info("ADD EMPLOYEE START");
        log.debug("Request: {}", request);

        validateRequest(request);

        String email = request.getEmail().trim();
        log.debug("Checking email existence: {}", email);
        Optional<Employees> optionalEmployee = employeeRepository.findByEmail(email);

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("purpose", "email-verification");
        String token = jwtUtils.generateToken(claims, email);
        log.debug("Generated verification token (first 20 chars): {}", token.length() > 20 ? token.substring(0, 20) + "..." : token);

        if (optionalEmployee.isPresent()) {
            Employees existing = optionalEmployee.get();
            log.info("Employee already exists: {}", existing.getEmail());

            if (existing.getIs_verified()) {
                log.warn("Attempt to re-register verified email: {}", email);
                throw new UserAlreadyVerifiedException("Email sudah terverifikasi dan terdaftar");
            }

            log.info("Updating verification token for existing unverified employee");
            existing.setVerificationToken(token);
            employeeRepository.save(existing);
            emailService.sendEmpVerificationEmail(existing.getEmail(), token);
            log.info("Verification email resent to: {}", email);
            return convertToResponse(existing);
        }

        Employees newEmployee = convertToEntity(request);
        newEmployee.setPassword(passwordEncoder.encode(request.getPassword()));
        newEmployee.setImg_url(null);
        newEmployee.setVerificationToken(token);
        newEmployee.setIs_verified(false);

        employeeRepository.save(newEmployee);
        log.info("New employee saved with ID: {}", newEmployee.getIdEmployee());

        emailService.sendEmpVerificationEmail(newEmployee.getEmail(), token);
        log.info("Verification email sent to: {}", newEmployee.getEmail());

        log.info("ADD EMPLOYEE SUCCESS");
        return convertToResponse(newEmployee);
    }

    @Override
    @Transactional
    public EmployeeResponse update(UUID id, EmployeeRequest request, MultipartFile file) {
        log.info("UPDATE EMPLOYEE START | ID: {}", id);
        log.debug("Update request: {}", request);

        Employees employee = employeeRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Employee not found for update: {}", id);
                    return new EmployeeNotFoundException("Employee not found: " + id);
                });

        employee.setUsername(request.getUsername().trim());
        employee.setEmail(request.getEmail().trim());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            log.debug("Updating password for employee: {}", id);
            employee.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (file != null && !file.isEmpty()){
            if (file.getSize() > 5 * 1024 * 1024) {
                log.warn("File too large: {} bytes", file.getSize());
                throw new ImageSizeUnaproriateException("File maksimal 5MB");
            }
            if (!Objects.requireNonNull(file.getContentType()).startsWith("image/")) {
                log.warn("Invalid file type: {}", file.getContentType());
                throw new ImageInvalidExtentionException("Hanya file gambar");
            }else{
                String idImg = UUID.randomUUID().toString();
                String imgUrl = cloudinaryService.uploadFile(file, idImg).getUrl();
                if (imgUrl == null) {
                    log.warn("Image upload failed");
                } else {
                    log.debug("Image uploaded successfully: {}", imgUrl);
                }
                employee.setImg_url(imgUrl);
                log.debug("Uploading image to Cloudinary with ID: {}", idImg);
            }
        }

        employeeRepository.save(employee);
        log.info("Employee updated successfully: {}", id);
        log.info("UPDATE EMPLOYEE SUCCESS");
        return convertToResponse(employee);
    }

    @Override
    public void delete(UUID id) {
        log.info("DELETE EMPLOYEE START | ID: {}", id);

        Employees existingEmployee = employeeRepository.findByIdEmployee(id)
                .orElseThrow(() -> {
                    log.warn("Employee not found for deletion: {}", id);
                    return new EmployeeNotFoundException("Employee with id: " + id + " not found");
                });

        try {
            if (existingEmployee.getImg_url() != null) {
                log.debug("Deleting image from Cloudinary: {}", existingEmployee.getImg_url());
                cloudinaryService.deleteFile(existingEmployee.getImg_url());
            }
        } catch (Exception e) {
            log.error("Error deleting image for employee {}: {}", id, e.getMessage());
        }

        employeeRepository.delete(existingEmployee);
        log.info("Employee deleted successfully: {}", id);
        log.info("DELETE EMPLOYEE SUCCESS");
    }

    @Override
    public List<EmployeeResponse> getAll() {
        log.info("GET ALL EMPLOYEES START");
        List<Employees> employees = employeeRepository.findAll();
        log.debug("Found {} employees", employees.size());
        List<EmployeeResponse> responses = employees.stream()
                .map(this::convertToResponse)
                .toList();
        log.info("GET ALL EMPLOYEES SUCCESS | Count: {}", responses.size());
        return responses;
    }

    @Override
    public ResponseEntity<String> verifyEmail(String token) {
        log.info("VERIFY EMPLOYEE EMAIL START");
        log.debug("Verification token (first 20 chars): {}", token != null && token.length() > 20 ? token.substring(0, 20) + "..." : token);

        if (token == null || token.isBlank()) {
            log.warn("Verification token is empty");
            throw new EmailShouldntBlankException("Token tidak boleh kosong");
        }

        String email = jwtUtils.extractEmail(token);
        if (email == null) {
            log.warn("Failed to extract email from token");
            throw new VerificationTokenNotValidException("Token tidak valid");
        }
        log.debug("Extracted email from token: {}", email);

        String purpose = jwtUtils.extractClaim(token, claims -> claims.get("purpose", String.class));
        if (!"email-verification".equals(purpose)) {
            log.warn("Token purpose invalid: {}", purpose);
            throw new VerificationTokenNotValidException("Token bukan untuk verifikasi email");
        }

        Employees employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("Employee not found during email verification: {}", email);
                    return new EmployeeNotFoundException("Employee tidak ditemukan");
                });

        if (!token.equals(employee.getVerificationToken())) {
            log.warn("Verification token mismatch for employee: {}", email);
            throw new VerificationTokenNotValidException("Token tidak cocok");
        }

        employee.setIs_verified(true);
        employee.setVerificationToken(null);
        employeeRepository.save(employee);
        log.info("Employee email verified successfully: {}", email);

        log.info("VERIFY EMPLOYEE EMAIL SUCCESS");
        return ResponseEntity.ok("Email berhasil diverifikasi");
    }

    @Override
    public AuthResponse login(EmployeeAuthRequest request) {
        log.info("EMPLOYEE LOGIN START | Email: {}", request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        log.debug("Spring Security authentication passed for: {}", request.getEmail());

        Employees employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Employee not found during login: {}", request.getEmail());
                    return new EmployeeNotFoundException("Employee tidak ditemukan");
                });

        if (!employee.getIs_verified()) {
            log.warn("Login attempt with unverified email: {}", request.getEmail());
            throw new UserNotVerifiedException("Email belum diverifikasi");
        }

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role", employee.getEmpRoles().getName());
        claims.put("purpose", "access");

        String token = jwtUtils.generateToken(claims, employee.getEmail());
        String role = jwtUtils.extractRole(token);
        Date expirationTime = jwtUtils.extractExpiration(token);

        log.debug("Access token generated (first 20 chars): {}", token.length() > 20 ? token.substring(0, 20) + "..." : token);
        log.info("Employee login successful: {} | Role: {}", employee.getEmail(), role);
        log.info("EMPLOYEE LOGIN SUCCESS");

        return new AuthResponse(token, role, expirationTime);
    }

    private EmployeeResponse convertToResponse(Employees newEmployee) {
        log.debug("Converting entity to response for employee ID: {}", newEmployee.getIdEmployee());
        return EmployeeResponse.builder()
                .employee_id(newEmployee.getIdEmployee().toString())
                .username(newEmployee.getUsername())
                .email(newEmployee.getEmail())
                .img_url(newEmployee.getImg_url())
                .created_at(newEmployee.getCreated_at())
                .updated_at(newEmployee.getUpdated_at())
                .build();
    }

    private Employees convertToEntity(EmployeeRequest request) {
        log.debug("Converting request to entity for email: {}", request.getEmail());
        Roles role = rolesRepository.findByName("CASHIER")
                .orElseThrow(() -> {
                    log.error("ROLE_CASHIER not found in database");
                    return new RoleNotFoundException("CASHIER Role not found");
                });

        return Employees.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .img_url(request.getImg_url())
                .empRoles(role)
                .build();
    }

    private void validateRequest(EmployeeRequest request) {
        log.debug("VALIDATING EMPLOYEE REQUEST");
        if (request == null) {
            log.warn("Request is null");
            throw new RequestShouldntEmptyException("Request tidak boleh null");
        }

        // Email
        if (request.getEmail() == null || !request.getEmail().matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            log.warn("Invalid email format: {}", request.getEmail());
            throw new EmailNotValidException("Email tidak valid");
        }

        // Password
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            log.warn("Password too short: {} chars", request.getPassword() != null ? request.getPassword().length() : 0);
            throw new PasswordMinLengthException("Password harus minimal 6 karakter");
        }

        // Username
        String username = request.getUsername();
        if (username == null || username.trim().isEmpty()) {
            log.warn("Username is empty");
            throw new UsernameShouldntBlankException("Nama tidak boleh kosong");
        }
        username = username.trim();
        if (username.length() < 8 || username.length() > 32) {
            log.warn("Username length invalid: {}", username.length());
            throw new UsernameInvalidLengthException("Username harus 8-32 karakter");
        }
        if (username.matches(".*\\d.*") || username.matches(".*[^a-zA-Z0-9].*")) {
            log.warn("Username contains invalid characters: {}", username);
            throw new UsernameContainNumberOrDigitsException("Username hanya boleh mengandung huruf");
        }

        log.debug("VALIDATION PASSED");
    }
}