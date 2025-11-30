package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "order_details")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_order_detail")
    private UUID idOrderDetail;

    @ManyToOne
    @JoinColumn(name = "id_order", nullable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private Products product;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "unit_price", nullable = false)
    private double unitPrice;

    @Column(nullable = false)
    private double subtotal;
}