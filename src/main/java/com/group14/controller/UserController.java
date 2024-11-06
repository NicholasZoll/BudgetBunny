package com.group14.controller;

import com.group14.budgetbunny.model.User;
import com.group14.budgetbunny.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserRepository repository;

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return repository.save(user);
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "Test endpoint working";
    }
}
