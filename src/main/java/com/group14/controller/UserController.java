package com.group14.controller;

import com.group14.budgetbunny.model.User;
import com.group14.budgetbunny.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository repository;

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return repository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser, HttpSession session) {
        Optional<User> user = repository.findByEmail(loginUser.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {
            session.setAttribute("username", user.get().getEmail());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "Test endpoint working";
    }

    @GetMapping("/getUserEmail")
    public ResponseEntity<String> getUserEmail(HttpSession session) {
        String email = (String) session.getAttribute("username");
        if (email != null) {
            return ResponseEntity.ok(email);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
    }
}
