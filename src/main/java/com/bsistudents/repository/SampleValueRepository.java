package com.bsistudents.repository;

import java.util.Optional;

import com.bsistudents.model.SampleValue;
import com.bsistudents.model.Sample;
import com.bsistudents.model.Test;
import com.bsistudents.model.Attribute;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleValueRepository extends JpaRepository<SampleValue, Integer> {
    Optional<SampleValue> findByTest(Test test);

    Optional<SampleValue> findBySample(Sample sample);
    
    Optional<SampleValue> findByTestAndAttribute(Test test, Attribute attribute);
    
    Optional<SampleValue> findBySampleAndTestAndAttribute(Sample sample, Test test, Attribute attribute);
}