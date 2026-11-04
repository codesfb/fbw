package dev.codesfb.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.codesfb.api.domain.ProjectMedia;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record MediaDto(
        String type,
        String src,
        String alt
) {
    public static MediaDto fromEntity(ProjectMedia media) {
        if (media == null) {
            return null;
        }
        return new MediaDto(
                media.getType(),
                media.getUrl(),
                media.getAlt()
        );
    }
}
