package com.robo.onlinebudget.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SaveNewMonth {

    private Long id;
    private String date;
    private Long spendId;
    private Integer amount;

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

}
