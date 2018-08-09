package com.robo.helloworld.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "wages")
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class WagesEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "salaryDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Moscow")
    private String salaryDate;

    @Column(name = "salary")
    private Integer salary;

    @Column(name = "prepaidDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Moscow")
    private String prepaidDate;

    @Column(name = "prepaid")
    private Integer prepaid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public String getSalaryDate() {
        return salaryDate;
    }

    public void setSalaryDate(String salaryDate) {
        this.salaryDate = salaryDate;
    }

    public Integer getPrepaid() {
        return prepaid;
    }

    public void setPrepaid(Integer prepaid) {
        this.prepaid = prepaid;
    }

    public String getPrepaidDate() {
        return prepaidDate;
    }

    public void setPrepaidDate(String prepaidDate) {
        this.prepaidDate = prepaidDate;
    }
}