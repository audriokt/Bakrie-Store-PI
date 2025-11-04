package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.roles.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Integer> {
    Optional<Roles> findByName(String roleName);
    Optional<Roles> findById(int id);
}
