package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.repository.OrderRepository;
import com.audrio.backendbakrie.repository.ProductRepository;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.io.ProductRequest;
import com.audrio.backendbakrie.io.ProductResponse;
import com.audrio.backendbakrie.service.CloudinaryService;
import com.audrio.backendbakrie.service.ProductService;
import com.audrio.backendbakrie.utils.Exceptions.ImageInvalidExtentionException;
import com.audrio.backendbakrie.utils.Exceptions.ImageSizeUnaproriateException;
import com.audrio.backendbakrie.utils.Exceptions.ProductNotFoundException;
import com.audrio.backendbakrie.utils.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CloudinaryService cloudinaryService;
    private final OrderRepository orderRepository;

    @Override
    public ProductResponse add(ProductRequest request, MultipartFile file) {
        String id = UUID.randomUUID().toString();
        String imgUrl = cloudinaryService.uploadFile(file, id).getUrl();
        Products newProduct = convertToEntity(request);
        newProduct.setImage_url(imgUrl);
        newProduct = productRepository.save(newProduct);
        return convertToResponse(newProduct);
    }

    @Override
    public Page<ProductResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public void delete(UUID id_product) {
        Products existingProduct = productRepository.findByIdProduct(id_product)
                .orElseThrow(() -> new ProductNotFoundException("Product not found: " + id_product));
        try{
            cloudinaryService.deleteFile(existingProduct.getImage_url());
        } catch (Exception e) {
            throw new RuntimeException("Error deleting image");
        }
        productRepository.delete(existingProduct);
    }

    @Override
    public ProductResponse update(UUID product_id,ProductRequest request, MultipartFile file) {
            Products existingProduct = productRepository.findByIdProduct(product_id)
                    .orElseThrow(() -> new ProductNotFoundException("Product not found: " + product_id));

        if (file != null && !file.isEmpty()) {
            if (file.getSize() > 5 * 1024 * 1024) {
                throw new ImageSizeUnaproriateException("File maksimal 5MB");
            }
            if (!file.getContentType().startsWith("image/")) {
                throw new ImageInvalidExtentionException("Hanya file gambar");
            }

            String imgId = UUID.randomUUID().toString();
            String imgUrl = cloudinaryService.uploadFile(file, imgId).getUrl();
            existingProduct.setImage_url(imgUrl);
        }

        productRepository.updateProductFields(
                product_id,
                request.getProduct_name(),
                request.getDescription(),
                request.getProduct_price(),
                request.getProduct_stock(),
                request.getImage_url()
        );
        return convertToResponse(existingProduct);
    }

    @Override
    public List<ProductResponse> getTopSellingProductsForHome() {
        // Menggunakan PageRequest.of(halaman, ukuran) untuk mencapai "LIMIT 10"
        Pageable pageable = (Pageable) PageRequest.of(0, 10);

        // Panggil repository dengan Pageable
        List<Products> products = productRepository.findTopSellingProducts();
        return products.stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public List<ProductResponse> searchProductsByName(String product_name) {
        if (product_name == null || product_name.trim().isEmpty()) {
            throw new IllegalArgumentException("Nama produk tidak boleh kosong");
        }
        List<Products> products = productRepository.findByProductNameContainingIgnoreCase(product_name);
        return products.stream()
                .map(this::convertToResponse)
                .toList();
    }

    public void reduceStock(UUID productId, int qty) {
        Products product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setProduct_stock(product.getProduct_stock() - qty);
        productRepository.save(product);
    }

    public void restoreStock(UUID productId, int qty) {
        Products product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setProduct_stock(product.getProduct_stock() + qty);
        productRepository.save(product);
    }


    private ProductResponse convertToResponse(Products newProduct) {
        return ProductResponse.builder()
                .id_product(newProduct.getIdProduct().toString())
                .product_name(newProduct.getProductName())
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
                .productName(request.getProduct_name())
                .description(request.getDescription())
                .product_price(request.getProduct_price())
                .product_stock(request.getProduct_stock())
                .image_url(request.getImage_url())
                .build();
    }
}
