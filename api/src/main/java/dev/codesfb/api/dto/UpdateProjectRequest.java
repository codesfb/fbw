package dev.codesfb.api.dto;

import dev.codesfb.api.domain.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UpdateProjectRequest(
        @NotBlank(message = "O título é obrigatório")
        @Size(max = 120)
        String title,

        String description,
        String siteUrl,
        String downloadUrl,
        String detailsUrl,
        ProjectStatus status,
        Boolean featured,
        List<String> tags
) {
}
