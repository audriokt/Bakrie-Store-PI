package com.audrio.backendbakrie.model;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_order;

    @OneToMany
    @JoinColumn(name = "id_customer")
    private Customers id_customer;

    @OneToMany
    @JoinColumn(name = "id_employee")
    private Employees id_employee;

    @NotNull
    @Size(max = 100)
    @Column(unique = true)
    private String deliver_address;

    @NotNull
    @Size(max = 100)
    @Column(unique = true)
    private String order_number;

    @NotNull
    @Size(max = 6)
    @Column(unique = true)
    private LocalDate order_date;

    @NotNull
    @Size(max = 20)
    @Column(unique = true)
    private String order_status;
}
