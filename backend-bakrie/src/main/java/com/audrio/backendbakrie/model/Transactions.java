package com.audrio.backendbakrie.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.type.descriptor.jdbc.VarcharJdbcType;
import org.hibernate.validator.constraints.UUID;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transaction")
@Data
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_transaction;

    @OneToOne
    @JoinColumn(name = "id_customer")
    private Customers customers;

    @OneToOne
    @JoinColumn(name = "id_order")
    private Orders orders;

    @NotNull
    @Size(max = 100)
    @Column(unique = true)
    private String invoice_number;

    @NotNull
    @Size(max = 30)
    @Column(name = "payment_method")
    private String payment_method;

    @NotNull
    @Column(name = "payment_date")
    private LocalDate payment_date;

    @NotNull
    @Column(name = "total", precision = 7, scale = 2)
    private float total;



}
