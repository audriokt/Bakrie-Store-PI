package com.audrio.backendbakrie.io;

import com.audrio.backendbakrie.entity.Employees;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder

public class EmployeesResponse {
    private UUID idEmployee;
    private String email;
    private String password;
    private Employees.Role role;
    private Timestamp created_at;
    private Timestamp updated_at;
}
