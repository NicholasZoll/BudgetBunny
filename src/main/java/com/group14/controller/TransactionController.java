package com.group14.controller;

import com.group14.budgetbunny.model.Transaction;
import com.group14.budgetbunny.repository.TransactionRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.*;
// import com.group14.budgetbunny.model.User;
// import com.group14.budgetbunny.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionRepository.findById(id);
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transactionDetails) {
        return transactionRepository.findById(id).map(transaction -> {
            transaction.setTitle(transactionDetails.getTitle());
            transaction.setAmount(transactionDetails.getAmount());
            transaction.setDate(transactionDetails.getDate());
            transaction.setEnvelope(transactionDetails.getEnvelope());
            transaction.setAccount(transactionDetails.getAccount());
            transaction.setNotes(transactionDetails.getNotes());
            return transactionRepository.save(transaction);
        }).orElseGet(() -> {
            transactionDetails.setId(id);
            return transactionRepository.save(transactionDetails);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionRepository.deleteById(id);
    }

    @GetMapping("/userTransactions")
    public ResponseEntity<List<Transaction>> getUserTransactions(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId != null) {
            List<Transaction> transactions = transactionRepository.findByUserId(userId);
            return ResponseEntity.ok(transactions);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}