package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.io.ProductResponse;
import com.audrio.backendbakrie.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/public/products")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse addProduct(@RequestPart("product") String productString,
                                      @RequestPart("file") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        ProductRequest request = null;
        try{
            request = mapper.readValue(productString, ProductRequest.class);
            return productService.add(request, file);
        } catch(JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to product request"+e.getMessage());
        }
    }

    @GetMapping("/public/products")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> fetchAllProducts(){
        return productService.getAll();
    }

    @DeleteMapping("/public/products/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String productId){
        try {
            productService.delete(UUID.fromString(productId));
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }

    }
}
