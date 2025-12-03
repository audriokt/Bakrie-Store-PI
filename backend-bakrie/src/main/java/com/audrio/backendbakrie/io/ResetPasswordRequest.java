package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResetPasswordRequest {
    private String token;
    private String password;
    private String confirmPassword;
}
