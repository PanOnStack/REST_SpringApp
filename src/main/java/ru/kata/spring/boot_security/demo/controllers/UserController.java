package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;

@Controller
@RequestMapping("/users")
public class UserController {

    @GetMapping("/user")
    public String showUser(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        model.addAttribute("user", (User) userDetails);
        return "user/show";
    }
}
