package com.robo.onlinebudget.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SaveSpends {

    private Long id;
    private String name;
    private Integer amount;
    private boolean salaryPrepaid;
    private boolean withdraw;
    private Integer index;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public boolean getSalaryPrepaid() {
        return salaryPrepaid;
    }

    public void setSalaryPrepaid(boolean salaryPrepaid) {
        this.salaryPrepaid = salaryPrepaid;
    }

    public boolean getWithdraw() {
        return withdraw;
    }

    public void setWithdraw(boolean withdraw) {
        this.withdraw = withdraw;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
