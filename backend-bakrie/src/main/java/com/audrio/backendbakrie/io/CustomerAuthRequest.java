package com.audrio.backendbakrie.io;

import lombok.Builder;

@Builder
public class CustomerAuthRequest {
    private String Email;
    private String Password;
}
