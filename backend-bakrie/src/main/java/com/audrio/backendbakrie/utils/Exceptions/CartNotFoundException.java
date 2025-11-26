package com.audrio.backendbakrie.utils.Exceptions;

public class CartNotFoundException extends RuntimeException{
    public CartNotFoundException(String message){
        super(message);
    }
}
