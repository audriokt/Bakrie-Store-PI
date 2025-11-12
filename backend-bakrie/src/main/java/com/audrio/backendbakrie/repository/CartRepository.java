package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Item_Carts;
import org.hibernate.boot.model.naming.ImplicitTenantIdColumnNameSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Carts, UUID> {
//    Berdasarkan entity
    Optional<Carts> findByCustomerId(UUID customer);

//    Berdasarkan customer id
    @Query("SELECT c FROM Carts c WHERE c.customerId = :customerId")
    Optional<Carts> findCartByCustomerId(@Param("customerId") UUID customerId);
}
