package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface EmployeeService {
    EmployeeResponse add(EmployeeRequest request, MultipartFile file);
    EmployeeResponse update(UUID id, EmployeeRequest request);
    void delete(UUID id);
    List<EmployeeResponse> getAll();
    ResponseEntity<String> verifyEmail(String token);
    AuthResponse login(EmployeeAuthRequest request);
}
