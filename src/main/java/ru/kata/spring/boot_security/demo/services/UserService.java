package ru.kata.spring.boot_security.demo.services;



import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;
public interface UserService extends UserDetailsService {
    List<User> findAll();
    User findOne(int id);
    void save(User user);
    void update(int id, User updatedUser);
    void delete(int id);
}
