package com.audrio.backendbakrie.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "order_details")
@Data
@Builder
public class OrderDetail {

    @Id
    @Column(name = "id_order_detail", length = 100, nullable = false)
    private UUID idOrderDetail;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "id_order",nullable = false)
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private Products product;

    @ManyToOne
    @JoinColumn(name = "id_cart", nullable = false)
    private Carts cart;
}