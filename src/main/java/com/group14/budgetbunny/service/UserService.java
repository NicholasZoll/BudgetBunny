// package com.group14.budgetbunny.service;


// import com.group14.budgetbunny.model.User;
// import com.group14.budgetbunny.repo.UserRepo;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepo userRepository;  // Assuming you have a repository for User entity

//     @Autowired
//     private PasswordEncoder passwordEncoder;  // Inject the PasswordEncoder

//     public void registerUser(User user) {
//         // Hash the password before saving to the database
//         String hashedPassword = passwordEncoder.encode(user.getPassword());
//         user.setPassword(hashedPassword);

//         // Save the user with the hashed password
//         userRepository.save(user);
//     }

//     public boolean validatePassword(String rawPassword, String encodedPassword) {
//         // Validate the raw password against the hashed one
//         return passwordEncoder.matches(rawPassword, encodedPassword);
//     }
// }

