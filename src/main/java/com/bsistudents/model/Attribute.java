package com.bsistudents.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Size(max = 99)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "TestAttributes", joinColumns = @JoinColumn(name = "attribute_Id"), inverseJoinColumns = @JoinColumn(name = "test_Id"))
    private Set<Test> tests = new HashSet<>();

    @OneToMany(mappedBy = "attribute_Id", cascade = CascadeType.ALL)
    private Set<SampleValue> values = new HashSet<>();

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Test> getTests() {
        return this.tests;
    }

    public void setTests(Set<Test> tests) {
        this.tests = tests;
    }

    public Set<SampleValue> getValues() {
        return this.values;
    }

    public void setValues(Set<SampleValue> values) {
        this.values = values;
    }
}
