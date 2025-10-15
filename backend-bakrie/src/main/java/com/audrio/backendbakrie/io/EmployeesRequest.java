package com.audrio.backendbakrie.io;

import com.audrio.backendbakrie.entity.Employees;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class EmployeesRequest {
    private String email;
    private String password;
    private Employees.Role role;
}
