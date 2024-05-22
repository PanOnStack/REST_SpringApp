package ru.kata.spring.boot_security.demo.util;

import java.time.LocalDateTime;

public class UserErrorResponse {
    private String error;
    private LocalDateTime timestamp;

    public UserErrorResponse(String error, LocalDateTime timestamp) {
        this.error = error;
        this.timestamp = timestamp;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
