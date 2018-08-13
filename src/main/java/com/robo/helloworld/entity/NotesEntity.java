package com.robo.helloworld.entity;

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

    @Column(name = "date")
    private String date;

    @Column(name = "text")
    private String text;

    @Column(name = "isRemind")
    private boolean isRemind;

    @Column(name = "isMuted")
    private boolean isMuted;

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

    public boolean isRemind() {
        return isRemind;
    }

    public void setRemind(boolean remind) {
        isRemind = remind;
    }

    public boolean isMuted() {
        return isMuted;
    }

    public void setMuted(boolean muted) {
        isMuted = muted;
    }

    public NotesEntity(Long id, String date, boolean isRemind, boolean isMuted) {
        this.id = id;
        this.date = date;
        this.isRemind = isRemind;
        this.isMuted = isMuted;
    }

}
