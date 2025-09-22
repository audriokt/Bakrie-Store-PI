package com.audrio.backendbakrie.model;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "carts")
@Data

public class Carts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_cart;

    @OneToOne
    @JoinColumn(name = "id_customers")
    private Customers id_Customers;

    @NotNull
    @Column(unique = true)
    private LocalDate created_at;

    @NotNull
    @Column(unique = true)
    private LocalDate updated_at;
    
}
