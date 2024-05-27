package ru.kata.spring.boot_security.demo.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.util.Set;

public class UserDTO {
    private int id;
    @Size(min = 2, max = 30, message = "Name should be between 2 and 30 characters")
    private String name;
    @Size(min = 2, max = 30, message = "Username should be between 2 and 30 characters")
    private String username;
    @Size(min = 2, max = 30, message = "Last name should be between 2 and 30 characters")
    private String lastName;
    @Email(message = "e-mail should be valid")
    private String email;
    @Size(min=8, message = "should be contains 8 symbols or more")
    private String password;
    Set<String> roles;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
