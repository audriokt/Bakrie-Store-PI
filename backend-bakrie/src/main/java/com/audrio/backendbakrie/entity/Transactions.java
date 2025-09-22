package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Data
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_transaction")
    private UUID idTransaction;

    @OneToOne
    @JoinColumn(name = "id_order", nullable = false)
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "id_customer", nullable = false)
    private Customers customer;

    @NotNull
    @Size(max = 100)
    @Column(name = "invoice_number", unique = true)
    private String invoiceNumber;

    @NotNull
    @Size(max = 30)
    @Column(name = "payment_method")
    private String paymentMethod;

    @NotNull
    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @NotNull
    @Column(name = "total", precision = 10, scale = 2)
    private BigDecimal total;

}