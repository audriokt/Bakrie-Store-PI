package com.audrio.backendbakrie.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Builder
@Data
public class CustomerResponse {
    private String customer_id;
    private String username;
    private String address;
    private String email;
    private String phone_num;
    private Timestamp updated_at;
    private Timestamp created_at;
}
