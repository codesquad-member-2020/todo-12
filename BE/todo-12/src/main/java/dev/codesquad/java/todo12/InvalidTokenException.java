package dev.codesquad.java.todo12;

public class InvalidTokenException extends RuntimeException{
    private final int ERROR_CODE;

    public InvalidTokenException(String message, int errorCode) {
        super(message);
        this.ERROR_CODE = errorCode;
    }

    public InvalidTokenException(String message) {
        this(message, 400);
    }
}
