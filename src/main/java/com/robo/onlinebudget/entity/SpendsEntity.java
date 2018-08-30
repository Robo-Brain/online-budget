package com.robo.onlinebudget.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "spends")
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SpendsEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "salaryPrepaid")
    private boolean salaryPrepaid;

    @Column(name = "withdraw")
    private boolean withdraw;

    @Column(name = "indexNum")
    private Integer index;

    @OneToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST }, fetch = FetchType.LAZY)
    @JoinColumn(name = "spendId", updatable = false)
    private List<SpendsMonthlyEntity> spendsMonthly = new ArrayList<>();

    public SpendsEntity(Long id, String name, Integer amount, boolean salaryPrepaid, boolean withdraw, Integer index) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.salaryPrepaid = salaryPrepaid;
        this.withdraw = withdraw;
        this.index = index;
    }

    public SpendsEntity(Long id, Integer amount) {
        this.id = id;
        this.amount = amount;
    }

    public SpendsEntity(Integer index) {
        this.index = index;
    }

    public SpendsEntity(Long id, String name) {
        this.id = id;
        this.name = name;
    }

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

    public List<SpendsMonthlyEntity> getSpendsMonthly() {
        return spendsMonthly;
    }

    public void setSpendsMonthly(List<SpendsMonthlyEntity> spendsMonthly) {
        this.spendsMonthly = spendsMonthly;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
