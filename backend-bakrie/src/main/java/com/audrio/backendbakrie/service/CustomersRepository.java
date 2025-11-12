package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.entity.Customers;
import org.springframework.data.repository.Repository;

import java.util.UUID;

interface CustomersRepository extends Repository<Customers, UUID> {

}
