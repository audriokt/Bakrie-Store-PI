package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.CustomerRequest;
import com.audrio.backendbakrie.io.CustomerResponse;
import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.service.CustomerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/customers")
@AllArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponse createCustomer(@RequestPart("customer") String customerString,
                                           @RequestPart("file")MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();
        CustomerRequest request = null;
        try{
            request = mapper.readValue(customerString,CustomerRequest.class);
            return customerService.Add(request, file);
        }catch(JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to customer request"+e.getMessage());
        }
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CustomerResponse> fetchAllCustomers() {
        return customerService.getAll();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerResponse updateCustomer(@PathVariable String id, @RequestBody CustomerRequest customerRequest) {
        return customerService.update(UUID.fromString(id), customerRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable String id) {
        try {
            customerService.delete(UUID.fromString(id));
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
