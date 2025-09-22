package com.audrio.backendbakrie.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Table(name = "employees")
@Data
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

}
