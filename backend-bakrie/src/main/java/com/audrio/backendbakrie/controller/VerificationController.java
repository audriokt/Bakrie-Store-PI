package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class VerificationController {

    private final CustomerService customerService;
    private final EmployeeService employeeService;

    @PostMapping("/req/signup/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        return customerService.verifyEmail(token);
    }

    @PostMapping("/req/signup/emp/verify")
    public ResponseEntity<String> verifyEmpEmail(@RequestParam("token") String token) {
        return employeeService.verifyEmail(token);
    }
}
