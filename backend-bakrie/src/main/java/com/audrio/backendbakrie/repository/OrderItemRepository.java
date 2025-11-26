package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderDetail, UUID>{

}
