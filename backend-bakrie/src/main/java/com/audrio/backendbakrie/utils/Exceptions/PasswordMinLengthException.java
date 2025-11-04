package com.audrio.backendbakrie.utils.Exceptions;

public class PasswordMinLengthException extends RuntimeException {
    public PasswordMinLengthException(String message) {
        super(message);
    }
}
