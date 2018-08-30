package com.robo.onlinebudget.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "spendsMonthly")
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SpendsMonthlyEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Moscow")
    private String date;

    @Column(name = "spendId", unique = true)
    private Long spendId;

    @Column(name = "amount")
    private Integer amount;

    public SpendsMonthlyEntity(Long id, Long spendId) {
        this.id = id;
        this.spendId = spendId;
    }

    public SpendsMonthlyEntity(Long id, Integer amount) {
        this.id = id;
        this.amount = amount;
    }

    public SpendsMonthlyEntity(Long id, Long spendId, Integer amount) {
        this.spendId = spendId;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getSpendId() {
        return spendId;
    }

    public void setSpendId(Long spendId) {
        this.spendId = spendId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public SpendsMonthlyEntity(String date) {
        this.date = date;
    }
}
