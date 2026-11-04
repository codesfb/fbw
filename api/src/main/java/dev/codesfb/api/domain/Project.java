package dev.codesfb.api.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "github_repo", nullable = false, unique = true, length = 200)
    private String githubRepo;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "repo_url", length = 300)
    private String repoUrl;

    @Column(name = "site_url", length = 300)
    private String siteUrl;

    @Column(name = "download_url", length = 300)
    private String downloadUrl;

    @Column(name = "details_url", length = 300)
    private String detailsUrl;

    @Column(nullable = false, length = 20)
    private ProjectStatus status = ProjectStatus.EM_ANDAMENTO;

    @Column(nullable = false)
    private boolean featured = false;

    @Column(name = "tags", columnDefinition = "text[]")
    private String[] tags = new String[0];

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "languages")
    private List<String> languages = new ArrayList<>();

    private Integer stars;

    @Column(name = "github_updated_at")
    private OffsetDateTime githubUpdatedAt;

    @Column(name = "synced_at")
    private OffsetDateTime syncedAt;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position ASC")
    private List<ProjectMedia> media = new ArrayList<>();

    public Project() {
    }

    public Project(String githubRepo, String title) {
        this.githubRepo = githubRepo;
        this.title = title;
    }

    public void addMedia(ProjectMedia item) {
        media.add(item);
        item.setProject(this);
    }

    public void removeMedia(ProjectMedia item) {
        media.remove(item);
        item.setProject(null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGithubRepo() {
        return githubRepo;
    }

    public void setGithubRepo(String githubRepo) {
        this.githubRepo = githubRepo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRepoUrl() {
        return repoUrl;
    }

    public void setRepoUrl(String repoUrl) {
        this.repoUrl = repoUrl;
    }

    public String getSiteUrl() {
        return siteUrl;
    }

    public void setSiteUrl(String siteUrl) {
        this.siteUrl = siteUrl;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }

    public String getDetailsUrl() {
        return detailsUrl;
    }

    public void setDetailsUrl(String detailsUrl) {
        this.detailsUrl = detailsUrl;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public List<String> getTags() {
        return tags != null ? Arrays.asList(tags) : new ArrayList<>();
    }

    public void setTags(List<String> tags) {
        this.tags = tags != null ? tags.toArray(new String[0]) : new String[0];
    }

    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages != null ? languages : new ArrayList<>();
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public OffsetDateTime getGithubUpdatedAt() {
        return githubUpdatedAt;
    }

    public void setGithubUpdatedAt(OffsetDateTime githubUpdatedAt) {
        this.githubUpdatedAt = githubUpdatedAt;
    }

    public OffsetDateTime getSyncedAt() {
        return syncedAt;
    }

    public void setSyncedAt(OffsetDateTime syncedAt) {
        this.syncedAt = syncedAt;
    }

    public List<ProjectMedia> getMedia() {
        return media;
    }

    public void setMedia(List<ProjectMedia> media) {
        this.media = media != null ? media : new ArrayList<>();
    }
}
