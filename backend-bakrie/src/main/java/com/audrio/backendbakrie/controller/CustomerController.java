package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.io.UpdateProfileCusRequest;
import com.audrio.backendbakrie.service.CustomerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping(value = "/public/auth/register/customer", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponse createCustomer(@Valid @RequestBody CustomerRequest customerRequest){
            return customerService.add(customerRequest);
    }

    @GetMapping("/admin/customers/fetchCustomers")
    @ResponseStatus(HttpStatus.OK)
    public List<CustomerResponse> fetchAllCustomers() {
        return customerService.getAll();
    }

    @PutMapping("/customer/update/{custId}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerResponse updateCustomer(@Valid @PathVariable String custId,
                                           @RequestPart("customer") String customerString,
                                           @RequestPart(name = "file", required = false) MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        UpdateProfileCusRequest request = null;
        try{
            request = mapper.readValue(customerString, UpdateProfileCusRequest.class);
            return customerService.update(UUID.fromString(custId), request, file);
        } catch(JsonProcessingException e) {
            log.error("JsonProcessingException : {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to product request"+e.getMessage());
        }
    }

    @DeleteMapping("/customer/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@Valid @PathVariable String id) {
        try {
            customerService.delete(UUID.fromString(id));
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/customer/myprofile")
    @ResponseStatus(HttpStatus.OK)
    public CustomerResponse myProfile(@Valid @RequestHeader("Authorization") String token){
        try{
            log.info("Method : GET | Endpoint : /customer/myprofile | Payload : {}", token);
            return customerService.customerProfile(token);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
