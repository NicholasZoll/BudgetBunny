package com.group14.budgetbunny.repo;

import com.group14.budgetbunny.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    // Additional query methods can be defined here if needed
}