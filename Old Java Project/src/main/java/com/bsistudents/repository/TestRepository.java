package com.bsistudents.repository;

import java.util.Optional;

import com.bsistudents.model.Test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Integer> {
    Optional<Test> findByName(String name);
}