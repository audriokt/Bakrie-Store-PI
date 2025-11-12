package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_carts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @Positive
    @Min(1)
    private Integer quantity;

    @NotNull
    @Column(name = "price_per_unit")
    @Positive
    @Min(1)
    private Double pricePerUnit;

    @NotNull
    @Column(name = "sub_price")
    @Positive
    private Double subPrice;

    @CreationTimestamp
    @Column(name = "added_at")
    private Timestamp addedAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}