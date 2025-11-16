package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.service.CustomerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    public CustomerResponse createCustomer(@RequestBody CustomerRequest customerRequest){
            return customerService.add(customerRequest);
    }

    @GetMapping("/admin/customers/fetchCustomers")
    @ResponseStatus(HttpStatus.OK)
    public List<CustomerResponse> fetchAllCustomers() {
        return customerService.getAll();
    }

    @PutMapping("/customer/update/{custId}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerResponse updateCustomer(@PathVariable String custId,
                                           @RequestPart("customer") String customerString,
                                           @RequestPart("file") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        CustomerRequest request = null;
        try{
            request = mapper.readValue(customerString, CustomerRequest.class);
            return customerService.update(UUID.fromString(custId), request, file);
        } catch(JsonProcessingException e) {
            log.error("JsonProcessingException : {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to product request"+e.getMessage());
        }
    }

    @DeleteMapping("/customer/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable String id) {
        try {
            customerService.delete(UUID.fromString(id));
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/customer/myprofile")
    @ResponseStatus(HttpStatus.OK)
    public CustomerResponse myProfile(@RequestHeader("Authorization") String token){
        try{
            log.info("Method : GET | Endpoint : /customer/myprofile | Payload : {}", token);
            return customerService.customerProfile(token);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

}
