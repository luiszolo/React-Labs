package com.bsistudents.repository;

import java.util.Optional;

import com.bsistudents.model.Attribute;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeRepository extends JpaRepository<Attribute, Integer> {
    Optional<Attribute> findByName(String name);
}