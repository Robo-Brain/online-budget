package com.robo.onlinebudget.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class SaveNote {

    private Long id;
    private String date;
    private String text;
    private boolean isRemind;
    private Long stuckSpendId;

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean getRemind() {
        return isRemind;
    }

    public void setRemind(boolean remind) {
        isRemind = remind;
    }

    public Long getStuckSpendId() {
        return stuckSpendId;
    }

    public void setStuckSpendId(Long stuckSpendId) {
        this.stuckSpendId = stuckSpendId;
    }

    public SaveNote(String date, String text, boolean isRemind, Long stuckSpendId) {
        this.date = date;
        this.text = text;
        this.isRemind = isRemind;
        this.stuckSpendId = stuckSpendId;
    }

    @Override
    public String toString() {
        return "id: '" + this.id + "', date: '" + this.date + "', text: '" + this.text + "'" + "', isRemind: '" + this.isRemind + "'" + "', stuckSpendId: '" + this.stuckSpendId + "'";
    }

}
