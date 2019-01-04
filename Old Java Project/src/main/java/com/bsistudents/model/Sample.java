package com.bsistudents.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Sample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Size(max = 99)
    private String name;

    @OneToMany(mappedBy = "sample_Id", cascade = CascadeType.ALL)
    private Set<Log> logs;

    @OneToMany(mappedBy = "sample_Id", cascade = CascadeType.ALL)
    private Set<SampleValue> values;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Set<Log> getLogs() {
        return this.logs;
    }

    public void setLogs(Set<Log> logs) {
        this.logs = logs;
    }
}
