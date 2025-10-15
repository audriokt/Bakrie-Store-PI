package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.EmployeesRequest;
import com.audrio.backendbakrie.io.EmployeesResponse;
import com.audrio.backendbakrie.service.EmployeesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor

public class EmployeesController {
    private final EmployeesService employeesService;

    @PostMapping
    public ResponseEntity<EmployeesResponse> createEmployee(@RequestBody EmployeesRequest request) {
        return ResponseEntity.ok(employeesService.createEmployee(request));
    }

    @GetMapping
    public ResponseEntity<List<EmployeesResponse>> getAllEmployees() {
        return ResponseEntity.ok(employeesService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeesResponse> getEmployeeById(@PathVariable UUID id) {
        return ResponseEntity.ok(employeesService.getEmployeeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeesResponse> updateEmployee(@PathVariable UUID id, @RequestBody EmployeesRequest request) {
        return ResponseEntity.ok(employeesService.updateEmployee(id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable UUID id) {
        employeesService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
