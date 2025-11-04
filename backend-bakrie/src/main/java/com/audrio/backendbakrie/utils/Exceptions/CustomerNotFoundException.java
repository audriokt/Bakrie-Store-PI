package com.audrio.backendbakrie.utils.Exceptions;

public class CustomerNotFoundException extends RuntimeException{
    public CustomerNotFoundException(String message){
        super(message);
    }
}
