package com.audrio.backendbakrie.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {
    private String username;
    private String password;
    private String address;
    private String email;
    private String phone_num;
    private String img_url;
}
