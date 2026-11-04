package dev.codesfb.api.dto;

import dev.codesfb.api.domain.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateProjectRequest(
        @NotBlank(message = "O repositório do GitHub é obrigatório (ex: owner/repo)")
        @Size(max = 200)
        String githubRepo,

        @NotBlank(message = "O título é obrigatório")
        @Size(max = 120)
        String title,

        String description,
        String repoUrl,
        String siteUrl,
        String downloadUrl,
        String detailsUrl,
        ProjectStatus status,
        Boolean featured,
        List<String> tags
) {
}
