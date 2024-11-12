package com.group14.budgetbunny.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group14.budgetbunny.model.User;
import com.group14.budgetbunny.repo.UserRepo;

import jakarta.servlet.http.HttpSession;

@RestController
public class UserController {

    @Autowired
    UserRepo repository;

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return repository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginUser, HttpSession session) {
        Optional<User> user = repository.findByEmail(loginUser.getEmail());
        
        if (user.isPresent()) {
            System.out.println("User found with email: " + loginUser.getEmail());
            if (user.get().getPassword().equals(loginUser.getPassword())) {
                System.out.println("Password matches for user: " + loginUser.getEmail());
                session.setAttribute("userId", user.get().getId());
                session.setAttribute("username", user.get().getEmail());
                session.setAttribute("firstname", user.get().getFirstname());
                session.setAttribute("lastname", user.get().getLastname());
    
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                // response.put("redirectUrl", "/index.html");
    
                return ResponseEntity.ok(response);
            } else {
                System.out.println("Password mismatch for user: " + loginUser.getEmail());
            }
        } else {
            System.out.println("No user found with email: " + loginUser.getEmail());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(Collections.singletonMap("message", "Invalid credentials"));
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

    @GetMapping("/getUserInfo")
    public ResponseEntity<Map<String, String>> getUserInfo(HttpSession session) {
        String email = (String) session.getAttribute("username");
        String firstname = (String) session.getAttribute("firstname");
        String lastname = (String) session.getAttribute("lastname");

        if (email != null && firstname != null && lastname != null) {
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("email", email);
            userInfo.put("firstname", firstname);
            userInfo.put("lastname", lastname);
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
