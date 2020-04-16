package dev.codesquad.java.todo12;

import ch.qos.logback.core.status.Status;
import org.springframework.http.HttpStatus;

public class ApiResponseMessage {
    private org.springframework.http.HttpStatus statusCode;
    private boolean status;
    private String jwt;

    public ApiResponseMessage(org.springframework.http.HttpStatus statusCode, boolean status) {
        this.statusCode = statusCode;
        this.status = status;
    }

    public ApiResponseMessage(org.springframework.http.HttpStatus statusCode, boolean status, String jwt) {
        this.statusCode = statusCode;
        this.status = status;
        this.jwt = jwt;
    }

    public HttpStatus getStatusCode() {
        return statusCode;
    }

    public boolean isStatus() {
        return status;
    }

    public String getJwt() {
        return jwt;
    }
}