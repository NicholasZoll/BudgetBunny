package com.group14.controller;

import com.group14.budgetbunny.model.Envelope;
import com.group14.budgetbunny.model.Transaction;
import com.group14.budgetbunny.repository.EnvelopeRepository;
import com.group14.budgetbunny.repository.TransactionRepository;
import com.group14.budgetbunny.repository.UserRepository;

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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnvelopeRepository envelopeRepository;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionRepository.findById(id);
    }


    
    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction, HttpSession session) {
        try {
            long userId = (long)session.getAttribute("userId");
            return userRepository.findById(userId).map(user -> {
            // Log incoming transaction for debugging
            System.out.println("Incoming Transaction: " + transaction);

            transaction.setUser(user);
    
            // Validate required fields
            if (transaction.getTitle() == null || transaction.getDate() == null || transaction.getAmount() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required fields.");
            }
    
            // Save transaction to the database
            Transaction savedTransaction = transactionRepository.save(transaction);

            long envelopeId = savedTransaction.getEnvelope().getId();
            Optional<Envelope> envelope = envelopeRepository.findById(envelopeId);
            if (envelope.isPresent()) {
                Envelope e = envelope.get();
                e.setSpent(e.getSpent().add(savedTransaction.getAmount()));
                envelopeRepository.save(e);
            }
    
            // Return saved transaction
            return ResponseEntity.ok(savedTransaction);
            }).orElseThrow(() -> new RuntimeException("bla bla"));
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
        transactionRepository.findById(id).map(transaction -> {
            long envelopeId = transaction.getEnvelope().getId();
            Optional<Envelope> envelope = envelopeRepository.findById(envelopeId);
            if (envelope.isPresent()) {
                Envelope e = envelope.get();
                e.setSpent(e.getSpent().subtract(transaction.getAmount()));
                envelopeRepository.save(e);
            }
            return transaction;
        });
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