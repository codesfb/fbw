package dev.codesfb.api.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "project_media")
public class ProjectMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 10)
    private String type; // "image" ou "video"

    @Column(nullable = false, length = 500)
    private String url;

    @Column(length = 200)
    private String alt;

    @Column(nullable = false)
    private int position = 0;

    public ProjectMedia() {
    }

    public ProjectMedia(String type, String url, String alt, int position) {
        this.type = type;
        this.url = url;
        this.alt = alt;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
