package de.huj.notanothertodo.payload.in;

import java.time.LocalDate;

public class ToDoRequest {
    private long id;
    private String title;
    private String body;
    private boolean checked;
    private LocalDate planed;
    private int points;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public LocalDate getPlaned() {
        return planed;
    }

    public void setPlaned(LocalDate planed) {
        this.planed = planed;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
