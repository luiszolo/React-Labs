package com.bsistudents.controller;

import java.util.List;

import com.bsistudents.model.Operator;
import com.bsistudents.repository.OperatorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class OperatorController {
    @Autowired
    private OperatorRepository operatorRepository;

    @GetMapping("/operators")
    public List<Operator> getAllOperators() {
        return operatorRepository.findAll();
    }
}
