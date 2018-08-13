package com.robo.helloworld.form;

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

    public boolean getRemind() {
        return isRemind;
    }

    public void setRemind(boolean remind) {
        isRemind = remind;
    }

    public boolean getMuted() {
        return isMuted;
    }

    public void setMuted(boolean muted) {
        isMuted = muted;
    }

    public SaveNote(String date, String text, boolean isRemind, boolean isMuted) {
        this.date = date;
        this.text = text;
        this.isRemind = isRemind;
        this.isMuted = isMuted;
    }
}
