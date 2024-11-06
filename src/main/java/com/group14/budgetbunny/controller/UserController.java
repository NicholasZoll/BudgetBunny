package com.group14.budgetbunny.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.group14.budgetbunny.model.User;
import com.group14.budgetbunny.repo.UserRepo;

@RestController
public class UserController {
    
    @Autowired
    UserRepo repository;

    @PostMapping("/addUser")
    public void addUser(@RequestBody User user) {
        repository.save(user);
    }
    @GetMapping("/test")
    public String testEndpoint() {
        return "Test endpoint working";
    }

}
