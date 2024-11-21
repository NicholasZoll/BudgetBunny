package com.group14.controller;

import com.group14.budgetbunny.model.Transaction;
import com.group14.budgetbunny.repository.TransactionRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

    @GetMapping("/recent")
    public ResponseEntity<List<Transaction>> getRecentTransactions(HttpSession session,
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        PageRequest pageable = PageRequest.of(page, size); // Define pagination
        List<Transaction> transactions = transactionRepository.findTopNByUserIdOrderByDateDesc(userId, pageable);
        System.out.println("Session User ID: " + session.getAttribute("userId"));

        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public Optional<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionRepository.findById(id);
    }


    
    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        try {
            // Log incoming transaction for debugging
            System.out.println("Incoming Transaction: " + transaction);
    
            // Validate required fields
            if (transaction.getTitle() == null || transaction.getDate() == null || transaction.getAmount() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required fields.");
            }
    
            // Save transaction to the database
            Transaction savedTransaction = transactionRepository.save(transaction);
    
            // Return saved transaction
            return ResponseEntity.ok(savedTransaction);
        } catch (Exception e) {
            System.err.println("Error saving transaction: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
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