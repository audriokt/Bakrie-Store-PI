package com.audrio.backendbakrie.Repository;

import com.audrio.backendbakrie.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

public interface EmployeesRepository extends JpaRepository<Employees, UUID> {
}
