package com.bsistudents.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Status", uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Size(max = 99)
    private String name;

    @OneToMany(mappedBy = "status_Id", cascade = CascadeType.ALL)
    private Set<Log> logs;

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

    public Set<Log> getLogs() {
        return this.logs;
    }

    public void setLogs(Set<Log> logs) {
        this.logs = logs;
    }
}
