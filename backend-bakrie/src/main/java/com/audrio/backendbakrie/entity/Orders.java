package com.audrio.backendbakrie.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_order")
    private UUID id_order;

    @ManyToOne
    @JoinColumn(name = "id_customer", nullable = false)
    private Customers customer;

    @ManyToOne
    @JoinColumn(name = "id_employee", nullable = false)
    private Employees employee;

    @NotNull
    @Size(max = 100)
    @Column(name = "deliver_address")
    private String deliverAddress;

    @NotNull
    @Size(max = 100)
    @Column(name = "order_number", unique = true)
    private String orderNumber;

    @NotNull
    @Column(name = "order_date")
    private LocalDate orderDate;

    @NotNull
    @Size(max = 20)
    @Column(name = "order_status")
    private String orderStatus;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Transactions transaction;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
}