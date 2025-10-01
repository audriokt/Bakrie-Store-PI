package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_product;

    @NotNull
    @Size(min = 2, max = 100)
    @Column(unique = true)
    private String product_name;

    @NotNull
    @Min(0)
    @Column(name= "product_price")
    private double product_price;

    @NotNull
    @Size(max = 500)
    @Column(name = "description")
    private String description;

    @NotNull
    @Min(0)
    @Column(name="product_stock")
    private int product_stock;

    @NotNull
    @Min(0)
    @Column(name="image_url")
    private String image_url;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;
}