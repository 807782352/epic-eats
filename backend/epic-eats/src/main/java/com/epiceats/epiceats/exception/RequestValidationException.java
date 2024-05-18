package com.epiceats.epiceats.exception;

public class RequestValidationException extends RuntimeException{

    public RequestValidationException(String message) {
        super(message);
    }
}
