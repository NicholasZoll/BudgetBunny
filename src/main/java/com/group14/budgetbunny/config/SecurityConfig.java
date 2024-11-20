// package com.group14.budgetbunny.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeRequests(authorize -> authorize
//                 .requestMatchers("/loginaccount.html", "/loginaccount.css", "/loginaccount.js", "/images/**").permitAll() // Allow access to static files
//                 .anyRequest().authenticated()
//             )
//             .formLogin(form -> form
//                 .loginPage("/loginaccount.html")
//                 .permitAll()
//             )
//             .logout(logout -> logout
//                 .permitAll()
//             );

//         return http.build();
//     }

//     // Define PasswordEncoder bean
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();  // You can use other encoders as well
//     }
// }

