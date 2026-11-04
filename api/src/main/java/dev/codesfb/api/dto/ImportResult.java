package dev.codesfb.api.dto;

import java.util.List;

public record ImportResult(
        List<ProjectDto> created,
        List<String> ignored,
        int total
) {
    public static ImportResult of(List<ProjectDto> created, List<String> ignored) {
        return new ImportResult(created, ignored, created.size() + ignored.size());
    }
}
