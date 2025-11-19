//package com.audrio.backendbakrie.io;
//
//import com.audrio.backendbakrie.entity.Employees;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//
//import java.time.LocalDateTime;
//import java.sql.Timestamp;
//import java.util.List;
//
//@Builder
//public record AdminProfileDTO(
//        UUID id,                          // UUID, bukan Long!
//        String email,
//        String username,
//        String fullName,                  // kamu belum punya field fullName → pakai username dulu atau tambah field
//        String profilePictureUrl,
//        String role,                      // akan berisi "ROLE_ADMIN", "ROLE_MANAGER", dll
//        List<String> permissions,
//        LocalDateTime createdAt,
//        LocalDateTime lastLoginAt,        // kamu belum punya → nanti bisa ditambah
//        Boolean isVerified,
//        Boolean isActive                  // kamu pakai is_verified, kita anggap ini = isActive
//) {
//
//    // Constructor dari entity Employees (ADMIN atau karyawan lain)
//    public AdminProfileDTO(Employees employee) {
//        this(
//                employee.getIdEmployee(),
//                employee.getEmail(),
//                employee.getUsername(),
//                employee.getUsername(), // sementara pakai username sebagai nama tampilan
//                employee.getImg_url(),
//                employee.getEmpRoles() != null ? employee.getEmpRoles().getName() : "ROLE_USER",
//                generatePermissions(employee),
//                toLocalDateTime(employee.getCreated_at()),
//                null, // lastLoginAt belum ada di entity → nanti tambah kolom
//                employee.getIs_verified(),
//                employee.getIs_verified() // is_verified = isActive
//        );
//    }
//
//    // Helper: ubah Timestamp → LocalDateTime
//    private static LocalDateTime toLocalDateTime(Timestamp timestamp) {
//        return timestamp != null ? timestamp.toLocalDateTime() : null;
//    }
//
//    // Helper: generate permissions berdasarkan role
//    private static List<String> generatePermissions(Employees employee) {
//        if (employee == null || employee.getEmpRoles() == null) {
//            return List.of();
//        }
//
//        String roleName = employee.getEmpRoles().getName();
//
//        return "ROLE_ADMIN".equals(roleName) ?
//                List.of(
//                        "MANAGE_PRODUCTS", "MANAGE_EMPLOYEES", "MANAGE_ORDERS",
//                        "MANAGE_CUSTOMERS", "VIEW_REPORTS", "MANAGE_SETTINGS", "DELETE_ANY"
//                ) :
//                "ROLE_MANAGER".equals(roleName) ?
//                        List.of("MANAGE_PRODUCTS", "MANAGE_ORDERS", "VIEW_REPORTS") :
//                        "ROLE_STAFF".equals(roleName) ?
//                                List.of("MANAGE_ORDERS", "VIEW_PRODUCTS") :
//                                List.of("VIEW_PROFILE");
//    }
//}