package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    List<User> findAll();
    List<Role> findAllRoles();
    User findOne(int id);
    Role findRole(String roleName);
    void save(User user);
    void update(int id, User updatedUser);
    void delete(int id);
}
