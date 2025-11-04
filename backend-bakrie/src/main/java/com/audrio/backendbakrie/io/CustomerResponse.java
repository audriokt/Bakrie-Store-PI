package com.audrio.backendbakrie.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse {
    private String customer_id;
    private String username;
    private String address;
    private String email;
    private String phone_num;
    private String img_url;
    private Timestamp updated_at;
    private Timestamp created_at;
}
