package com.audrio.backendbakrie.utils.Exceptions;

public class RequestShouldntEmptyException extends RuntimeException {
    public RequestShouldntEmptyException(String message) {
        super(message);
    }
}
