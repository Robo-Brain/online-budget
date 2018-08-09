package com.robo.helloworld.form;

import org.springframework.stereotype.Repository;

@Repository
public class SaveNewWage {

    private Long id;
    private String salaryDate;
    private Integer salary;
    private String prepaidDate;
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
