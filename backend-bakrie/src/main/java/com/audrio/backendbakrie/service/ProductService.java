package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.io.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    ProductResponse add(ProductRequest request, MultipartFile file);
    Page<ProductResponse> getAll(int page, int size);
    void delete(UUID product_id);
    ProductResponse update(UUID product_id, ProductRequest request, MultipartFile file);
    List<ProductResponse> getTopSellingProductsForHome();
    List<ProductResponse> searchProductsByName(String keyword);
    void restoreStock(UUID productId, int qty);
    void reduceStock(UUID productId, int qty);
}
