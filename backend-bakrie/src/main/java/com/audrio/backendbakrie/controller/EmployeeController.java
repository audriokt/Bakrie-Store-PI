package com.audrio.backendbakrie.controller;


import com.audrio.backendbakrie.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
@AllArgsConstructor
public class EmployeeController {
    private final EmployeeRepository employeeRepository;


}
