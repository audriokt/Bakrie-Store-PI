package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Integer> {
}
