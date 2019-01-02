package com.bsistudents.model;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "operator_Id")
    private Operator operator;

    @ManyToOne
    @JoinColumn(name = "sample_Id")
    private Sample sample;

    @ManyToOne
    @JoinColumn(name = "status_Id")
    private Status status;

    @NotBlank
    private Date onCreated;

    public Operator getOperator() {
        return this.operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Sample getSample() {
        return this.sample;
    }

    public void setSample(Sample sample) {
        this.sample = sample;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getOnCreated() {
        return this.onCreated;
    }
}
