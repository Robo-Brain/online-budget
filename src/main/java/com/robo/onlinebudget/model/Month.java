package com.robo.onlinebudget.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Month {

    Long id;
    Long spendId;
    String name;
    Integer amount;
    Integer monthAmount;
    Integer index;
    String date;
    boolean salaryPrepaid;
    boolean withdraw;
    boolean inactive;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSpendId() {
        return spendId;
    }

    public void setSpendId(Long spendId) {
        this.spendId = spendId;
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

    public Integer getMonthAmount() {
        return monthAmount;
    }

    public void setMonthAmount(Integer monthAmount) {
        this.monthAmount = monthAmount;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isSalaryPrepaid() {
        return salaryPrepaid;
    }

    public void setSalaryPrepaid(boolean salaryPrepaid) {
        this.salaryPrepaid = salaryPrepaid;
    }

    public boolean isWithdraw() {
        return withdraw;
    }

    public void setWithdraw(boolean withdraw) {
        this.withdraw = withdraw;
    }

    public boolean isInactive() {
        return inactive;
    }

    public void setInactive(boolean inactive) {
        this.inactive = inactive;
    }

    @Override
    public String toString() {
        return "Id: '" + this.id
                + "', spendId: '" + this.spendId
                + "', name: '" + this.name
                + "', amount: '" + this.amount
                + "', monthAmount: '" + this.monthAmount
                + "', index: '" + this.index
                + "', date: '" + this.date
                + "', salaryPrepaid: '" + this.salaryPrepaid
                + "', withdraw: '" + this.withdraw
                + "', inactive: '" + this.inactive
                + "'";
    }

}
