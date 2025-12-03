package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.*;
import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final CustomerService customerService;
    private final EmployeeService employeeService;

    /**
     * Endpoint untuk Customer Login
     */
    @PostMapping("/public/auth/login/customer")
    public AuthResponse customerLogin(@Valid @RequestBody CustomerAuthRequest request) {
        return customerService.login(request);
    }

    /**
     * Endpoint untuk Employee Login
     */
    @PostMapping("/public/auth/login/employee")
    public AuthResponse employeeLogin(@Valid @RequestBody EmployeeAuthRequest request) {
        return employeeService.login(request);
    }

    @PostMapping("/public/auth/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return customerService.forgotPassword(request);
    }

    @PostMapping("/public/auth/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return customerService.resetPassword(request);
    }

//    @GetMapping("/public/auth/reset-password")
//    public ResponseEntity<?> validateResetToken(@RequestParam("token") String token) {
//        boolean isValid = customerService.isResetTokenValid(token);
//        if (isValid) {
//            return ResponseEntity.ok("Token valid");
//        } else {
//            return ResponseEntity.badRequest().body("Token tidak valid atau sudah kadaluarsa");
//        }
//    }
}
