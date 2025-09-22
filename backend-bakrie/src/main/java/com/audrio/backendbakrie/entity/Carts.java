package com.audrio.backendbakrie.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "carts")
@Data
public class Carts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_cart")
    private UUID idCart;

    @OneToOne
    @JoinColumn(name = "id_customers", nullable = false)
    private Customers customer;

    @NotNull
    @Column(name = "created_at")
    private LocalDate createdAt;

    @NotNull
    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item_Carts> items;
}
