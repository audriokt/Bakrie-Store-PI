package com.audrio.backendbakrie.utils;

import org.springframework.http.HttpStatus;

public class ExceptionUtils extends RuntimeException{
    private static HttpStatus STATUS;
//    image validation exceptions
    public static final String  INVALID_EXTENSION = "Only jpg, png, gif, bmp files are allowed";
    public static final String  IMG_SIZE_TO_BIG = "Max file size is 2MB";

//    Upload image
    public static final String FAILED_TO_UPLOAD_IMG = "Failed to upload image";

//    entity product
    public static final String PRODUCT_NOT_FOUND = "Product not found";

//    entity customer
    public static final String CUSTOMER_NOT_FOUND = "Customer not found";
    public static final String CUSTOMER_ALREADY_EXISTS = "Customer already exists";

    public ExceptionUtils(String message){
        super(message);
    }
    public ExceptionUtils(String message, HttpStatus status){
        super(message);
        STATUS = status;

    }

}
