package com.audrio.backendbakrie.utils.Exceptions;

public class PhoneNumberShouldntBlankException extends RuntimeException {
    public PhoneNumberShouldntBlankException(String message) {
        super(message);
    }
}
