package com.audrio.backendbakrie.controller.admin;

import com.audrio.backendbakrie.entity.Orders;
import com.audrio.backendbakrie.io.*;
import com.audrio.backendbakrie.io.admin.DashboardSummaryResponse;
import com.audrio.backendbakrie.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Controller
public class DashboardAdminController {
    private final DashboardService dashboardService;
    private final ProductService productService;
    private final OrderService orderService;
    private final CustomerService customerService;
    private final EmployeeService employeeService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryResponse> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }

    @GetMapping("/products")
    public Page<ProductResponse> fetchAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        return productService.getAll(page, size);
    }


    @PostMapping(value = "/products", consumes = "multipart/form-data")
    public ResponseEntity<ProductResponse> addProduct(
            @RequestPart("product") ProductRequest request,
            @RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(productService.add(request, file));
    }

    @PutMapping(value = "/products/{id}", consumes = "multipart/form-data")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable UUID id,
            @RequestPart("product") ProductRequest request,
            @RequestPart(value = "file", required=false) MultipartFile file) {
        // Jika file null, update tanpa ganti gambar
        return ResponseEntity.ok(productService.update(id, request, file));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrdersResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAll());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrdersResponse> getOrder(@PathVariable UUID id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<OrdersResponse> updateOrderStatus(
            @PathVariable UUID id,
            @RequestParam String status) { // PAID, SHIPPED, COMPLETED, CANCELLED
        return ResponseEntity.ok(orderService.updateStatus(id, Orders.OrderStatus.valueOf(status)));
    }

    @GetMapping("/customers")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAll());
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable UUID id) {
        customerService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAll());
    }

    @PostMapping(value = "/employees", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeResponse> addEmployee(
            @RequestPart("employee") EmployeeRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return ResponseEntity.ok(employeeService.add(request));
    }
    @DeleteMapping("/employees/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEmployee(@PathVariable UUID id) {
        employeeService.delete(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping(value = "/employees/{id}", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable UUID id,
            @RequestPart("employee") EmployeeRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        // Jika file null, update tanpa ganti foto
        return ResponseEntity.ok(employeeService.update(id, request, file));
    }


}
