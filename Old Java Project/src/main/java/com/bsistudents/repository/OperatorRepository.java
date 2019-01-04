package com.bsistudents.repository;

import java.util.Optional;

import com.bsistudents.model.Operator;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OperatorRepository extends JpaRepository<Operator, Integer> {
    Optional<Operator> findByName(String name);

    Optional<Operator> findByIdOrName(int id, String name);

    Boolean isExistsByName(int id);
}
