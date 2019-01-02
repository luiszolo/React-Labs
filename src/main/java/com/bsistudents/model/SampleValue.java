package com.bsistudents.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SampleValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "sample_Id")
    private Sample sample;

    @ManyToOne
    @JoinColumn(name = "test_Id")
    private Test test;

    @NotBlank
    @Size(max = 99)
    private String value;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Sample getSample() {
        return this.sample;
    }

    public void setSample(Sample sample) {
        this.sample = sample;
    }

    public Test getTest() {
        return this.test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
