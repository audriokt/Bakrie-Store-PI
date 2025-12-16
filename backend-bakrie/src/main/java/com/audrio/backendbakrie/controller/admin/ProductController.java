package com.audrio.backendbakrie.controller.admin;

import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.io.ProductResponse;
import com.audrio.backendbakrie.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Page<ProductResponse>> fetchAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {

        log.info("Method : GET | Endpoint : /public/products/fetchProducts | page={} size={}", page, size);
        Page<ProductResponse> products = productService.getAll(page, size);
        return ResponseEntity.ok(products);
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
                                  @RequestPart(name="file", required = false) MultipartFile file,
                                  @PathVariable UUID productId){
        log.info("Method : PUT | Endpoint : /admin/product/update | ProductId: {}", productId);
        ObjectMapper mapper = new ObjectMapper();
        ProductRequest request = null;
        try{
            request = mapper.readValue(productString, ProductRequest.class);
            return productService.update(productId, request, file);
        } catch(JsonProcessingException e) {
            log.error("JsonProcessingException : {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to product request"+e.getMessage());
        }
    }

    @GetMapping("/public/top-products")
    public ResponseEntity<List<ProductResponse>> getTopSellingProductsForHome() {
        // Mencatat bahwa request untuk produk terlaris telah diterima
        log.info("REQUEST RECEIVED | Method: GET | Path: /public/top-products");

        List<ProductResponse> topProducts = productService.getTopSellingProductsForHome();

        // Mencatat status sukses dan jumlah data yang dikirim
        log.info("RESPONSE SENT | Status: 200 OK | Top Products Count: {}", topProducts.size());

        return ResponseEntity.ok(topProducts);
    }

    @GetMapping("public/product/search")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> searchProducts(@RequestParam String name) {
        List<ProductResponse> products = productService.searchProductsByName(name);
        return products;
    }

}
