package com.audrio.backendbakrie.Repository;

import com.audrio.backendbakrie.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, Long> {
    Optional<Customers> findByVerification_token(String token);
    Optional<Customers> findByEmail(String email);
}
