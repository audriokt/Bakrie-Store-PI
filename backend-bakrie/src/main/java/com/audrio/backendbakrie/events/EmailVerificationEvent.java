package com.audrio.backendbakrie.events;

import lombok.Builder;
import lombok.Data;
import org.springframework.context.ApplicationEvent;

@Data
@Builder
public class EmailVerificationEvent extends ApplicationEvent {
    private final String email;
    private final String token;
    private final String verificationUrl;
    private final String subject;
    private final String message;

    public EmailVerificationEvent(String email, String token, String verificationUrl, String subject, String message) {
        super(email);
        this.email = email;
        this.token = token;
        this.verificationUrl = verificationUrl;
        this.subject = subject;
        this.message = message;
    }
}
