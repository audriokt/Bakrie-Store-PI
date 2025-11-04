package com.audrio.backendbakrie.io;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {
    @NotBlank
    private String password;

    @NotBlank
    private String email;

    @NotBlank
    private String username;

    private String img_url;
}
