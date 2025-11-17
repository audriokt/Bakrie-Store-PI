package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.io.ProductResponse;
import com.audrio.backendbakrie.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    @PostMapping("/admin/product/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse addProduct(@Valid @RequestPart("product") String productString,
                                      @RequestPart("file") MultipartFile file) {
        log.info("Method : POST | Endpoint : /admin/product/add | Payload : {}", productString);
        ObjectMapper mapper = new ObjectMapper();
        ProductRequest request = null;
        try{
            request = mapper.readValue(productString, ProductRequest.class);
            return productService.add(request, file);
        } catch(JsonProcessingException e) {
            log.error("JsonProcessingException : {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to product request"+e.getMessage());
        }
    }

    @GetMapping("/public/products/fetchProducts")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> fetchAllProducts(){
        log.info("Method : GET | Endpoint : /public/products/fetchProducts | Payload : {}", HttpStatus.OK);
        return productService.getAll();
    }

    @DeleteMapping("/admin/product/delete/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@Valid @PathVariable String productId){
        log.info("Method :  DELETE | Endpoint : /admin/product/delete | ProductId: {}", productId);
        try {
            productService.delete(UUID.fromString(productId));
        } catch (Exception e){
            log.error("Exception occur while deleting product with id: {}", productId);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }

    }

    @PutMapping("/admin/product/update/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse update(@Valid @RequestPart("product") String productString,
                                  @RequestPart("file") MultipartFile file,
                                  @PathVariable UUID productId){
        log.info("Method : PUT | Endpoint : /admin/product/update | ProductId: {}", productId);
        ObjectMapper mapper = new ObjectMapper();
        ProductRequest request = null;
        try{
            request = mapper.readValue(productString, ProductRequest.class);
        } catch(JsonProcessingException e) {
            log.error("JsonProcessingException : {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to product request"+e.getMessage());
        }
        return productService.update(productId, request);
    }
}
