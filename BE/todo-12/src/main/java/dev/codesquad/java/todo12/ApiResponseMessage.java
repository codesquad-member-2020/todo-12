package dev.codesquad.java.todo12;

public class ApiResponseMessage {
    private String status;
    private Object data;

    public ApiResponseMessage(String status) {
        this.status = status;
    }

    public ApiResponseMessage(String status, Object data) {
        this.status = status;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public Object getData() {
        return data;
    }
}