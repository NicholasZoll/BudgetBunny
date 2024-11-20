package com.group14.budgetbunny.repository;

import com.group14.budgetbunny.model.Transaction;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Fetch all transactions for a specific user
    List<Transaction> findByUserId(Long userId);
    // Custom query to fetch the most recent transactions for a user with pagination
    @Query("SELECT t FROM Transaction t WHERE t.account.user.id = :userId ORDER BY t.date DESC")
    List<Transaction> findTopNByUserIdOrderByDateDesc(@Param("userId") Long userId, Pageable pageable);
}