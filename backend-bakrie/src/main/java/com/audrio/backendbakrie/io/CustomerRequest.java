package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CustomerRequest {
    private String username;
    private String password;
    private String address;
    private String email;
    private String phone_num;
}
