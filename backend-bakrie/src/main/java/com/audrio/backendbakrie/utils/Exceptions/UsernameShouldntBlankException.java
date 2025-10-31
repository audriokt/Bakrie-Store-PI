package com.audrio.backendbakrie.utils.Exceptions;

public class UsernameShouldntBlankException extends RuntimeException{
    public UsernameShouldntBlankException(String message){
        super(message);
    }
}
