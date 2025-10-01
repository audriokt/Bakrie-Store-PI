package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.Repository.ProductRepository;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.io.ProductResponse;
import com.audrio.backendbakrie.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public ProductResponse add(ProductRequest request) {
        Products newProduct = convertToEntity(request);
        newProduct = productRepository.save(newProduct);
        return convertToResponse(newProduct);
    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.findAll()
                .stream()
                .map(products -> convertToResponse(products))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(UUID id_product) {
        Products existingProduct = productRepository.findByIdProduct(id_product)
                .orElseThrow(() -> new RuntimeException("product not found"));
        productRepository.delete(existingProduct);
    }

    @Override
    public ProductResponse update(UUID product_id,ProductRequest request) {
        return null;
    }

    private ProductResponse convertToResponse(Products newProduct) {
        return ProductResponse.builder()
                .id_product(newProduct.getIdProduct().toString())
                .product_name(newProduct.getProduct_name())
                .description(newProduct.getDescription())
                .image_url(newProduct.getImage_url())
                .product_price(newProduct.getProduct_price())
                .product_stock(newProduct.getProduct_stock())
                .created_at(newProduct.getCreated_at())
                .updated_at(newProduct.getUpdated_at())
                .build();
    }

    private Products convertToEntity(ProductRequest request) {
        return Products.builder()
                .product_name(request.getProduct_name())
                .description(request.getDescription())
                .product_price(request.getProduct_price())
                .product_stock(request.getProduct_stock())
                .image_url(request.getImage_url())
                .build();
    }
}
