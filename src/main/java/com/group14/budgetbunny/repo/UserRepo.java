package com.group14.budgetbunny.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.group14.budgetbunny.model.User;

@RepositoryRestResource 
public interface UserRepo extends JpaRepository<User, Long> {
    // User findByUsername(String username);
    
}
