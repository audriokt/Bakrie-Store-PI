package com.audrio.backendbakrie.model;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "employees")
@Data
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_employee;

    @NotNull
    @Size(max = 100)
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Size(max = 200)
    @Column(name = "password", unique = true)
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    public enum Role {
        admin,
        cashier
    }









}
