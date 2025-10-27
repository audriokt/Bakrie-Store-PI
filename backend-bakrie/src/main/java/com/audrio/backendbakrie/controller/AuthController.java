package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.CustomerAuthRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.io.EmployeeAuthRequest;
import com.audrio.backendbakrie.io.EmployeeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    /*
        fungsi userType untuk membantu pengecekkan table,
        hanya perlu mengecek salahsatu table saja tidak
        perlu mengecek kedua table untuk mencari user
        yang ingin login.
    */
    @PostMapping("/customer/login")
    public CustomerResponse customerLogin(@RequestBody CustomerAuthRequest request) {
        String userType = "CUSTOMER";

    }

    @PostMapping("/employee/login")
    public EmployeeResponse employeeLogin(@RequestBody EmployeeAuthRequest request) {
        String userType = "EMPLOYEE";

    }


}
