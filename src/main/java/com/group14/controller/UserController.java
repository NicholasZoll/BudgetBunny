package com.group14.controller;

import com.group14.budgetbunny.model.User;
import com.group14.budgetbunny.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class UserController {
    
    @Autowired
    UserRepository repository;

    @PostMapping("/addUser")
    public void addUser(@RequestBody User user) {
        repository.save(user);
    }
    @GetMapping("/test")
    public String testEndpoint() {
        return "Test endpoint working";
    }

}
