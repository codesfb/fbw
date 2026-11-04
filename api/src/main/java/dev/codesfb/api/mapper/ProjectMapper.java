package dev.codesfb.api.mapper;

import dev.codesfb.api.domain.Project;
import dev.codesfb.api.domain.ProjectMedia;
import dev.codesfb.api.dto.MediaDto;
import dev.codesfb.api.dto.ProjectDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class ProjectMapper {

    private final String baseUrl;

    public ProjectMapper(@Value("${app.base-url:http://localhost:8080}") String baseUrl) {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
    }

    public ProjectDto toCardDto(Project project) {
        if (project == null) {
            return null;
        }

        MediaDto firstMedia = null;
        if (project.getMedia() != null && !project.getMedia().isEmpty()) {
            firstMedia = toMediaDto(project.getMedia().get(0));
        }

        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getRepoUrl(),
                project.getLanguages() != null ? project.getLanguages() : Collections.emptyList(),
                project.getGithubUpdatedAt(),
                project.getStatus(),
                project.getSiteUrl(),
                project.getDownloadUrl(),
                project.getDetailsUrl(),
                firstMedia,
                project.getTags() != null ? project.getTags() : Collections.emptyList(),
                project.isFeatured(),
                project.getStars(),
                null
        );
    }

    public ProjectDto toDetailDto(Project project) {
        if (project == null) {
            return null;
        }

        List<MediaDto> gallery = null;
        MediaDto firstMedia = null;
        if (project.getMedia() != null && !project.getMedia().isEmpty()) {
            gallery = project.getMedia().stream()
                    .map(this::toMediaDto)
                    .toList();
            firstMedia = gallery.get(0);
        }

        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getRepoUrl(),
                project.getLanguages() != null ? project.getLanguages() : Collections.emptyList(),
                project.getGithubUpdatedAt(),
                project.getStatus(),
                project.getSiteUrl(),
                project.getDownloadUrl(),
                project.getDetailsUrl(),
                firstMedia,
                project.getTags() != null ? project.getTags() : Collections.emptyList(),
                project.isFeatured(),
                project.getStars(),
                gallery
        );
    }

    public MediaDto toMediaDto(ProjectMedia media) {
        if (media == null) {
            return null;
        }
        String resolvedUrl = resolveUrl(media.getUrl());
        return new MediaDto(media.getType(), resolvedUrl, media.getAlt());
    }

    private String resolveUrl(String url) {
        if (url == null || url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        if (url.startsWith("/")) {
            return baseUrl + url;
        }
        return baseUrl + "/" + url;
    }
}
