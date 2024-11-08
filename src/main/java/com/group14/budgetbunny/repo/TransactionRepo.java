package com.group14.budgetbunny.repo;

import com.group14.budgetbunny.model.Transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
}