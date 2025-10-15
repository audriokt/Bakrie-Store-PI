package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.EmployeesRequest;
import com.audrio.backendbakrie.io.EmployeesResponse;

import java.util.List;
import java.util.UUID;

public interface EmployeesService {
    EmployeesResponse createEmployee(EmployeesRequest request);
    List<EmployeesResponse> getAllEmployees();
    EmployeesResponse getEmployeeById(UUID id);
    EmployeesResponse updateEmployee(UUID id, EmployeesRequest request);
    void deleteEmployee(UUID id);

}
