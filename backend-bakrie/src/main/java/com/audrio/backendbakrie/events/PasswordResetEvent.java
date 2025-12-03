package com.audrio.backendbakrie.events;

import lombok.Builder;
import lombok.Data;
import org.springframework.context.ApplicationEvent;

@Data
@Builder
public class PasswordResetEvent extends ApplicationEvent {
    private final String email;
    private final String token;
    private final String resetUrl;

    public PasswordResetEvent(String email, String token, String resetUrl) {
        super(email);
        this.email = email;
        this.token = token;
        this.resetUrl = resetUrl;
    }
}
