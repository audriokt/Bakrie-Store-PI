package com.audrio.backendbakrie.entity;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_order")
    private UUID id_order;

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customers customers;

    @NotNull
    @Size(max = 100)
    @Column(name = "deliver_address")
    private String deliverAddress;

    @NotNull
    @Size(max = 100)
    @Column(name = "order_number", unique = true)
    private String orderNumber;

    @CreationTimestamp
    @Column(name = "order_date", updatable = false)
    private Timestamp orderDate;

    @NotNull
    @Size(max = 20)
    @Column(name = "order_status")
    private String orderStatus;

    @NotNull
    @Column(name = "total", precision = 10, scale = 2)
    private Double total;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
}