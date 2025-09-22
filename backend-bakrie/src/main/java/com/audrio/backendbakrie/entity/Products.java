package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "products")
@Data
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


    }