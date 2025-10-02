package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
public class Customers {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID idCustomer;

    @NotNull
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Column(name = "username")
    private String  username;

    @NotNull
    @Column(name = "address")
    private String address;

    @NotNull
    @Column(name = "phone_num")
    private String phone_num;

    @NotNull
    @Column(name = "password", unique = true)
    private String password;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToMany(mappedBy = "customer")
    private List<Orders> orders;

}
