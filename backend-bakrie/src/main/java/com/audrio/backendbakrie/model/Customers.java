package com.audrio.backendbakrie.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "customers")
public class Customers {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id_customer;




}
