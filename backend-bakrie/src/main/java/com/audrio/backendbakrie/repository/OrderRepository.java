package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Orders, UUID> {
    Optional<Orders> findByOrderNumber(String orderNumber);
    List<Orders> findByCustomers(Customers customer);
}
