package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.io.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    ProductResponse add(ProductRequest request, MultipartFile file);
    List<ProductResponse> getAll();
    void delete(UUID product_id);
    ProductResponse update(UUID product_id, ProductRequest request);
}
