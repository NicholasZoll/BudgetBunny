package com.group14.budgetbunny.repo;

import com.group14.budgetbunny.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AccountRepo extends JpaRepository<Account, Long> {
    // Additional query methods can be defined here if needed
}