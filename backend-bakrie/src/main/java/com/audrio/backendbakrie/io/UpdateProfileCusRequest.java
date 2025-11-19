package com.audrio.backendbakrie.io;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileCusRequest {
    private String username;

    @Email(message = "Format email tidak valid")
    private String email;

    private String address;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Nomor telepon harus 10–15 digit")
    private String phone_num;

    private String password;
}
