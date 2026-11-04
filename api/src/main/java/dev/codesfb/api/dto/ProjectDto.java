package dev.codesfb.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.codesfb.api.domain.Project;
import dev.codesfb.api.domain.ProjectMedia;
import dev.codesfb.api.domain.ProjectStatus;

import java.time.OffsetDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProjectDto(
        Long id,
        String title,
        String description,
        String repoUrl,
        List<String> languages,
        OffsetDateTime updatedAt,
        ProjectStatus status,
        String siteUrl,
        String downloadUrl,
        String detailsUrl,
        MediaDto media,
        List<String> tags,
        Boolean featured,
        Integer stars,
        List<MediaDto> gallery
) {
    public static ProjectDto fromEntity(Project project) {
        MediaDto firstMedia = null;
        List<MediaDto> gallery = null;

        if (project.getMedia() != null && !project.getMedia().isEmpty()) {
            List<ProjectMedia> mediaList = project.getMedia();
            firstMedia = MediaDto.fromEntity(mediaList.get(0));
            
            if (mediaList.size() > 1) {
                gallery = mediaList.stream()
                        .skip(1)
                        .map(MediaDto::fromEntity)
                        .toList();
            }
        }

        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getRepoUrl(),
                project.getLanguages(),
                project.getGithubUpdatedAt(),
                project.getStatus(),
                project.getSiteUrl(),
                project.getDownloadUrl(),
                project.getDetailsUrl(),
                firstMedia,
                project.getTags(),
                project.isFeatured(),
                project.getStars(),
                gallery
        );
    }
}
