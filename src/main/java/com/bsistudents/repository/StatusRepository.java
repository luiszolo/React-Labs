package com.bsistudents.repository;

import java.util.Optional;

import com.bsistudents.model.Status;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {
    Optional<Status> findByName(String name);
}