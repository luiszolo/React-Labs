package com.bsistudents.repository;

import java.util.Optional;

import com.bsistudents.model.Log;
import com.bsistudents.model.Sample;
import com.bsistudents.model.Status;
import com.bsistudents.model.Test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log, Integer> {
    Optional<Log> findBySample(Sample sample);

    Optional<Log> findByTest(Test test);

    Optional<Log> findByStatus(Status status);
}