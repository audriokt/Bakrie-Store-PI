//import com.audrio.backendbakrie.entity.Employees;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class AdminProfileDTO {
//    private Long id;
//    private String email;
//    private String fullName;
//    private String phoneNumber;
//    private String profilePictureUrl;
//    private String role;
//    private List<String> permissions;
//    private LocalDateTime createdAt;
//    private LocalDateTime lastLoginAt;
//    private Boolean isActive;
//
//    public static AdminProfileDTO fromEmployee(Employees admin) {
//        return AdminProfileDTO.builder()
//                .id(admin)
//                .email(admin.getEmail())
//                .fullName(admin.getFullName())
//                .phoneNumber(admin.getPhoneNumber())
//                .profilePictureUrl(admin.getProfilePictureUrl())
//                .role(admin.getRole())
//                .permissions(generatePermissions(admin.getRole()))
//                .createdAt(admin.getCreatedAt())
//                .lastLoginAt(admin.getLastLoginAt())
//                .isActive(admin.getIsActive())
//                .build();
//    }
//
//    private static List<String> generatePermissions(String role) {
//        return "ADMIN".equals(role) ? List.of("ALL") : List.of("LIMITED");
//    }
//}