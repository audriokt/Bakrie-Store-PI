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
public class CustomerAuthRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
