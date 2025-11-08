package com.audrio.backendbakrie.utils.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.password.CompromisedPasswordException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({UsernameShouldntBlankException.class})
    public ResponseEntity<Object> handleUsernameShouldntBlankException(UsernameShouldntBlankException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({EmailShouldntBlankException.class})
    public ResponseEntity<Object> handleEmailShouldntBlankException(EmailShouldntBlankException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({PhoneNumberBlankException.class})
    public ResponseEntity<Object> handlePhoneNumberBlankException(PhoneNumberBlankException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({CustomerAlreadyExistsException.class})
    public ResponseEntity<Object> handleCustomerAlreadyExistsException(CustomerAlreadyExistsException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({CustomerNotFoundException.class})
    public ResponseEntity<Object> handleCustomerNotFoundException(CustomerNotFoundException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({EmployeeNotFoundException.class})
    public ResponseEntity<Object> handleEmployeeNotFoundException(EmployeeNotFoundException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({EmployeeAlreadyExistException.class})
    public ResponseEntity<Object> handleEmployeeAlreadyExistException(EmployeeAlreadyExistException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({UserAlreadyVerifiedException.class})
    public ResponseEntity<Object> handleUserAlreadyVerifiedException(UserAlreadyVerifiedException ex) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(ex.getMessage());
    }

    @ExceptionHandler({VerificationTokenEmptyException.class})
    public ResponseEntity<Object> handleVerificationTokenEmptyException(VerificationTokenEmptyException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({VerificationTokenNotValidException.class})
    public ResponseEntity<Object> handleVerificationTokenNotValidException(VerificationTokenNotValidException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({EmailNotValidException.class})
    public ResponseEntity<Object> handleEmailNotValidException(EmailNotValidException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({CompromisedPasswordException.class})
    public ResponseEntity<Object> handleCompromisedPasswordException(CompromisedPasswordException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({RequestShouldntEmptyException.class})
    public ResponseEntity<Object> handleRequestShouldntEmptyException(RequestShouldntEmptyException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({ProductNotFoundException.class})
    public ResponseEntity<Object> handleProductNotFoundException(ProductNotFoundException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({ImageInvalidExtentionException.class})
    public ResponseEntity<Object> handleImageInvalidExtentionException(ImageInvalidExtentionException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({ImageSizeUnaproriateException.class})
    public ResponseEntity<Object>  handleImageSizeUnaproriateException(ImageSizeUnaproriateException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({ImageUploadFailedException.class})
    public ResponseEntity<Object>  handleImageUploadFiiledException(ImageUploadFailedException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({RoleNotFoundException.class})
    public ResponseEntity<Object>  handleRoleNotFoundException(RoleNotFoundException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({UsernameInvalidLengthException.class})
    public ResponseEntity<Object>  handleUsernameMinLengthException(UsernameInvalidLengthException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({UsernameContainNumberOrDigitsException.class})
    public ResponseEntity<Object> handleUsernameContainNumberOrDigitsException(UsernameContainNumberOrDigitsException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({PhoneNumberNotValidException.class})
    public ResponseEntity<Object> handlePhoneNumberNotValidException(PhoneNumberNotValidException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({PhoneNumberShouldntBlankException.class})
    public ResponseEntity<Object> handlePhoneNumberShouldntBlankException(PhoneNumberShouldntBlankException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({AddressShouldntBlankException.class})
    public ResponseEntity<Object> handleAddressShouldntBlankException(AddressShouldntBlankException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({UserNotVerifiedException.class})
    public ResponseEntity<Object> handleUserNotVerifiedException(UserNotVerifiedException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({ImageFileEmptyException.class})
    public ResponseEntity<Object> handleImageFileEmptyException(ImageFileEmptyException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }

    @ExceptionHandler({AddressInvalidLengthException.class})
    public ResponseEntity<Object> handleAddressInvalidLengthException(AddressInvalidLengthException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }
}
