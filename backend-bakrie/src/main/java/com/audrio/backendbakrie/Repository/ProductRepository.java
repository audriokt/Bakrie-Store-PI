package com.audrio.backendbakrie.Repository;

import com.audrio.backendbakrie.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Products, UUID> {
    Optional<Products> findByIdProduct(UUID id_product);
}
