package com.audrio.backendbakrie.entity;
import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    @NotNull
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp created_at;

    @NotNull
    @UpdateTimestamp
    private Timestamp updated_at;

    public enum Role {
        admin,
        cashier
    }









}
