package com.group14.budgetbunny.repo;

import com.group14.budgetbunny.model.Envelope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EnvelopeRepo extends JpaRepository<Envelope, Long> {
    // Additional query methods can be defined here if needed
}