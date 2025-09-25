package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "customers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customers {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id_customer;

    @NotNull
    @Size(max = 100)
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Size(max = 30)
    @Column(name = "username")
    private String  username;

    @NotNull
    @Size(max = 300)
    @Column(name = "address")
    private String address;

    @NotNull
    @Size(max = 14)
    @Column(name = "phone_num")
    private String phone_num;

    @NotNull
    @Size(max = 200)
    @Column(name = "password", unique = true)
    private String password;

    @NotNull
    @CreationTimestamp
    private Timestamp created_at;

    @NotNull
    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToMany(mappedBy = "customer")
    private List<Orders> orders;

}
