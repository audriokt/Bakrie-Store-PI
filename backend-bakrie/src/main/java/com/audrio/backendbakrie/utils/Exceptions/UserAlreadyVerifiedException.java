package com.audrio.backendbakrie.utils.Exceptions;

public class UserAlreadyVerifiedException extends RuntimeException {
    public UserAlreadyVerifiedException(String message){
        super(message);
    }
}
