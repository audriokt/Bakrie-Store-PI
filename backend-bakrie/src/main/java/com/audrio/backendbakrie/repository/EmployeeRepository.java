package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Employees;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository {
    Optional<Employees> findByIdCustomer(UUID idEmployee);
    @Modifying
    @Query("UPDATE Employees e SET e.email = :email, e.password = :password, e.img_url = :img_url WHERE e.idEmployee = :id_employee")
    void updateEmployeeFields(
            @Param("idEmployee") UUID idCustomer,
            @Param("email") String email,
            @Param("password") String password,
            @Param("address") String img_url
    );
    Optional<Employees> findByVerificationToken(String token);
    Optional<Employees> findByEmail(String email);
}
