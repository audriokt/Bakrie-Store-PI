package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employees, UUID> {
    Optional<Employees> findByIdEmployee(UUID idEmployee);
    @Modifying
    @Query("UPDATE Employees e SET e.username = :username, e.email = :email, e.password = :password, e.img_url = :img_url WHERE e.idEmployee = :id_employee")
    void updateEmployeeFields(
            @Param("idEmployee") UUID idEmployee,
            @Param("username") String username,
            @Param("email") String email,
            @Param("password") String password,
            @Param("img_url") String img_url
    );
    Optional<Employees> findByVerificationToken(String token);
    Optional<Employees> findByEmail(String email);
    Optional<Employees> findByUsername(String username);
}
