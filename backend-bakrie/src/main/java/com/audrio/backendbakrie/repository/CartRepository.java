package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Carts, UUID> {
//    Berdasarkan entity
    Carts findAllByCustomerId(Customers customer);

//    Berdasarkan customer id
    @Query("SELECT c FROM Carts c WHERE c.customerId = :customerId")
    Optional<Carts> findCartByCustomerId(@Param("customerId") UUID customerId);
}
