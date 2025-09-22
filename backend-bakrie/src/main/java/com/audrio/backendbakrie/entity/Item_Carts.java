package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_carts")
@Data
public class Item_Carts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_item_carts")
    private UUID idItemCarts;

    @ManyToOne
    @JoinColumn(name = "id_cart", nullable = false)
    private Carts cart;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private Products product;

    @NotNull
    @Column(name = "quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "added_at")
    private LocalDateTime addedAt;
}