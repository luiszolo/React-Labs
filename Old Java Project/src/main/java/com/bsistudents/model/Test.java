package com.bsistudents.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Test", uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Size(max = 99)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "TestAttributes", joinColumns = @JoinColumn(name = "test_Id"), inverseJoinColumns = @JoinColumn(name = "attribute_Id"))
    private Set<Attribute> attributes;

    @OneToMany(mappedBy = "test_Id", cascade = CascadeType.ALL)
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

    public Set<Attribute> getAttributes() {
        return this.attributes;
    }

    public void setAttributes(Set<Attribute> attributes) {
        this.attributes = attributes;
    }

    public Set<Log> getLogs() {
        return this.logs;
    }

    public void getLogs(Set<Log> logs) {
        this.logs = logs;
    }
}
