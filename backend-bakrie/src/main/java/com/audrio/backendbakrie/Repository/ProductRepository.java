package com.audrio.backendbakrie.Repository;

import com.audrio.backendbakrie.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Products, UUID> {
    Optional<Products> findByIdProduct(UUID id_product);

    @Modifying
    @Query("UPDATE Products pro SET pro.product_name = :product_name, pro.description = :description, pro.product_price = :product_price, pro.product_stock = :product_stock, pro.image_url = :img_url WHERE pro.idProduct = :idProduct")
    void updateProductFields(
            @Param("idProduct") UUID idProduct,
            @Param("product_name") String product_name,
            @Param("description") String description,
            @Param("product_price") Double product_price,
            @Param("product_stock") int product_stock,
            @Param("img_url")  String img_url
    );
}
