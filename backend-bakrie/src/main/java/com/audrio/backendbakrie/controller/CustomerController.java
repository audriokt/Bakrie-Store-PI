package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponse addCustomer(@RequestBody CustomerRequest customerRequest){
        return customerService.add(customerRequest);
    }

    @GetMapping("/coba")
    public String sayHello(){
        return "Hello World";
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        boolean verified = customerService.verifyEmail(token);
        if (verified) {
            return ResponseEntity.ok("Email berhasil diverifikasi.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Token tidak valid atau sudah kadaluarsa.");
        }
    }

}
