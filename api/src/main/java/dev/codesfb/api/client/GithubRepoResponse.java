package dev.codesfb.api.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GithubRepoResponse(
        String name,
        @JsonProperty("full_name") String fullName,
        String description,
        @JsonProperty("html_url") String htmlUrl,
        String homepage,
        @JsonProperty("stargazers_count") Integer stargazersCount,
        @JsonProperty("pushed_at") OffsetDateTime pushedAt,
        @JsonProperty("updated_at") OffsetDateTime updatedAt,
        Boolean fork,
        Boolean archived,
        List<String> topics
) {
}
