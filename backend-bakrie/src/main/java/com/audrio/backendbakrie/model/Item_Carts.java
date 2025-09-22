package com.audrio.backendbakrie.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_carts")
@Data

public class Item_Carts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_item_carts;

    @ManyToOne
    @JoinColumn(name = "id_cart")
    private Carts id_cart;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Products id_product;

    @NotNull
    @Column(name = "quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "added_at")
    private LocalDateTime added_at;







}