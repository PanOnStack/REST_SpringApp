package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String index(Model model) {
        model.addAttribute("users", userService.findAll());
        return "admin/index";
    }

    @GetMapping("/{id}")
    public String showUser(@PathVariable("id") int id, Model model) {

        model.addAttribute("user", userService.findOne(id));
        return "admin/show";
    }

    @GetMapping("/new")
    public String newUser(Model model) {
        model.addAttribute("user", new User());
        return "admin/new";
    }

    @PostMapping()
    public String create(@ModelAttribute("user") User user) {
        userService.save(user);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String editUser(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.findOne(id));
        return "admin/edit";
    }

    @PutMapping("/{id}")
    public String update(@ModelAttribute("user") User user, @PathVariable("id") int id) {
        userService.update(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/admin";
    }

}
