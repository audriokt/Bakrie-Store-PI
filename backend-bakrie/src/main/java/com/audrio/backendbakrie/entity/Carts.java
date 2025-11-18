package com.audrio.backendbakrie.entity;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "carts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Carts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_cart")
    private UUID cartId;

    @OneToOne
    @JoinColumn(name = "id_customers", nullable = false)
    private Customers customer;

    @NotNull
    @Column(name = "total_price")
    private double totalPrice;

    @NotNull
    @Column(name = "created_at")
    private Timestamp createdAt;

    @NotNull
    @Column(name = "updated_at")
    private Timestamp  updatedAt;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item_Carts> itemCarts;

    public Item_Carts findItemByProductId(UUID productId) {
        return itemCarts.stream()
                .filter(item -> item.getProduct().getIdProduct().equals(productId))
                .findFirst()
                .orElse(null);
    }
}