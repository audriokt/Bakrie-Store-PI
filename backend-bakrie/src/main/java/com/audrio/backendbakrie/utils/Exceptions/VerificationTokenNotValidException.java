package com.audrio.backendbakrie.utils.Exceptions;

public class VerificationTokenNotValidException extends RuntimeException{
    public VerificationTokenNotValidException(String message){
        super(message);
    }
}
