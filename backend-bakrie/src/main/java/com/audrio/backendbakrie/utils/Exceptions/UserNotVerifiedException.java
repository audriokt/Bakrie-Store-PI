package com.audrio.backendbakrie.utils.Exceptions;

public class UserNotVerifiedException extends RuntimeException {
    public UserNotVerifiedException(String message){
        super(message);
    }
}
