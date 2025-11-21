package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.AuthResponse;
import com.audrio.backendbakrie.io.CustomerAuthRequest;
import com.audrio.backendbakrie.io.EmployeeAuthRequest;
import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class AuthController {

    private final CustomerService customerService;
    private final EmployeeService employeeService;

    /**
     * Endpoint untuk Customer Login
     */
    @PostMapping("/auth/login/customer")
    public AuthResponse customerLogin(@Valid @RequestBody CustomerAuthRequest request) {
        return customerService.login(request);
    }

    /**
     * Endpoint untuk Employee Login
     */
    @PostMapping("/auth/login/employee")
    public AuthResponse employeeLogin(@Valid @RequestBody EmployeeAuthRequest request) {
        return employeeService.login(request);
    }
}
