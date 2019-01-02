package com.bsistudents.repository;

import java.util.Optional;

import com.bsistudents.model.Sample;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleRepository extends JpaRepository<Sample, Integer> {
    Optional<Sample> findByName(String name);
}