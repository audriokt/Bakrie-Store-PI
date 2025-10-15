package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Employees;
import com.audrio.backendbakrie.io.EmployeesRequest;
import com.audrio.backendbakrie.io.EmployeesResponse;
import com.audrio.backendbakrie.Repository.EmployeesRepository;
import com.audrio.backendbakrie.service.EmployeesService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class EmployeesServiceImpl implements EmployeesService {

    private final EmployeesRepository employeeRepository;
    private final EmployeesRepository employeesRepository;

    @Override
    @Transactional
    public EmployeesResponse createEmployee(EmployeesRequest request) {
        Employees employee = Employees.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .role(request.getRole())
                .build();

        Employees saved = employeeRepository.save(employee);
        return toResponse(saved);
    }

    @Override
    public List<EmployeesResponse> getAllEmployees() {
        List<Employees> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeesResponse getEmployeeById(UUID id) {
        Employees employee = employeesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return toResponse(employee);
    }
    @Override
    @Transactional
    public EmployeesResponse updateEmployee(UUID id, EmployeesRequest request) {
        Employees employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setEmail(request.getEmail());
        employee.setPassword(request.getPassword());
        employee.setRole(request.getRole());

        Employees updated = employeesRepository.save(employee);
        return toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteEmployee(UUID id) {
        if (!employeesRepository.existsById(id)) {
            throw new RuntimeException("Employee not found");
        }
        employeesRepository.deleteById(id);
    }

    private EmployeesResponse toResponse(Employees employee) {
        return EmployeesResponse.builder()
                .idEmployee(employee.getId_employee())
                .email(employee.getEmail())
                .password(employee.getPassword())
                .role(employee.getRole())
                .created_at(employee.getCreated_at())
                .updated_at(employee.getUpdated_at())
                .build();
    }
}


