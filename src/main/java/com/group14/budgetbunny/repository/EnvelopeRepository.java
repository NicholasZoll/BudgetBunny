package com.group14.budgetbunny.repository;

import com.group14.budgetbunny.model.Envelope;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EnvelopeRepository extends JpaRepository<Envelope, Long> {
    // Additional query methods can be defined here if needed
    List<Envelope> findByUserId(Long userId);
}