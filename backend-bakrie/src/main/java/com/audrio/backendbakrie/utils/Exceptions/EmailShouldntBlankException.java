package com.audrio.backendbakrie.utils.Exceptions;

public class EmailShouldntBlankException extends RuntimeException {
    public EmailShouldntBlankException(String message) {
        super(message);
    }
}
