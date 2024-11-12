package com.group14.controller;

import com.group14.budgetbunny.model.Envelope;
import com.group14.budgetbunny.repository.EnvelopeRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
// import com.group14.budgetbunny.model.User;
// import com.group14.budgetbunny.repository.UserRepository;

@RestController
@RequestMapping("/envelopes")
public class EnvelopeController {

    @Autowired
    private EnvelopeRepository envelopeRepository;

    @GetMapping
    public List<Envelope> getAllEnvelopes() {
        return envelopeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Envelope> getEnvelopeById(@PathVariable Long id) {
        return envelopeRepository.findById(id);
    }

    @PostMapping
    public Envelope createEnvelope(@RequestBody Envelope envelope) {
        return envelopeRepository.save(envelope);
    }

    @PutMapping("/{id}")
    public Envelope updateEnvelope(@PathVariable Long id, @RequestBody Envelope envelopeDetails) {
        return envelopeRepository.findById(id).map(envelope -> {
            envelope.setName(envelopeDetails.getName());
            envelope.setBudget(envelopeDetails.getBudget());
            envelope.setSpent(envelopeDetails.getSpent());
            return envelopeRepository.save(envelope);
        }).orElseGet(() -> {
            envelopeDetails.setId(id);
            return envelopeRepository.save(envelopeDetails);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteEnvelope(@PathVariable Long id) {
        envelopeRepository.deleteById(id);
    }

    @GetMapping("/userEnvelopes")
    public ResponseEntity<List<Envelope>> getUserEnvelopes(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId != null) {
            List<Envelope> envelopes = envelopeRepository.findByUserId(userId);
            return ResponseEntity.ok(envelopes);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}