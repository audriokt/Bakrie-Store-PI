package com.audrio.backendbakrie.roles;

import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Employees;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_roles;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "cusRoles")
    private List<Customers> customer;

    @OneToMany(mappedBy = "empRoles")
    private List<Employees> employes;
}
