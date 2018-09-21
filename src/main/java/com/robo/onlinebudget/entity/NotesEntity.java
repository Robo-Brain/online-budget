package com.robo.onlinebudget.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "notes")
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class NotesEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "date", nullable = false)
    private String date;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "isRemind")
    private boolean isRemind;

    @Column(name = "stuckSpendId")
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

    public NotesEntity(Long id, String date, boolean isRemind) {
        this.id = id;
        this.date = date;
        this.isRemind = isRemind;
    }

    public NotesEntity(Long id, String date, boolean isRemind, Long stuckSpendId) {
        this.id = id;
        this.date = date;
        this.isRemind = isRemind;
        this.stuckSpendId = stuckSpendId;
    }

}
