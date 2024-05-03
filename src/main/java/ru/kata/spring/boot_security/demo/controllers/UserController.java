package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String showUser(@AuthenticationPrincipal UserDetails userDetails, Model model) {

        model.addAttribute("user", (User) userDetails);
        return "user/show";
    }

    @GetMapping("/edit")
    public String edit(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        User user = (User) userDetails;
        model.addAttribute("user", user);
        return "user/edit";
    }

    @PutMapping("/put")
    public String update(@ModelAttribute("user") User updatedUser,
                         @AuthenticationPrincipal UserDetails userDetails) {
        User user = (User) userDetails;
        updatedUser.setRoles(user.getRoles());
        userService.update(user.getId(), updatedUser);
        SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
        return "redirect:/login";
    }

    @DeleteMapping("/delete")
    public String delete(@AuthenticationPrincipal UserDetails userDetails) {
        User user = (User) userDetails;
        userService.delete(user.getId());
        return "redirect:/login";
    }
}
