package dev.codesfb.api.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.*;

@Component
public class GithubClient {

    private static final Logger log = LoggerFactory.getLogger(GithubClient.class);
    private final RestClient restClient;

    public GithubClient(
            @Value("${app.github.api-url:https://api.github.com}") String apiUrl,
            @Value("${app.github.token:}") String token
    ) {
        RestClient.Builder builder = RestClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.ACCEPT, "application/vnd.github+json")
                .defaultHeader("X-GitHub-Api-Version", "2022-11-28");

        if (token != null && !token.isBlank()) {
            builder.defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token.trim());
        }

        this.restClient = builder.build();
    }

    public Optional<GithubRepoResponse> fetchRepo(String owner, String repo) {
        try {
            GithubRepoResponse response = restClient.get()
                    .uri("/repos/{owner}/{repo}", owner, repo)
                    .retrieve()
                    .body(GithubRepoResponse.class);
            return Optional.ofNullable(response);
        } catch (Exception e) {
            log.warn("Erro ao buscar repositório do GitHub '{}/{}': {}", owner, repo, e.getMessage());
            return Optional.empty();
        }
    }

    public List<String> fetchLanguages(String owner, String repo) {
        try {
            Map<String, Long> languagesMap = restClient.get()
                    .uri("/repos/{owner}/{repo}/languages", owner, repo)
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, Long>>() {});

            if (languagesMap == null || languagesMap.isEmpty()) {
                return Collections.emptyList();
            }

            // Ordena as linguagens por bytes decrescente e retorna apenas os nomes
            return languagesMap.entrySet().stream()
                    .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                    .map(Map.Entry::getKey)
                    .toList();
        } catch (Exception e) {
            log.warn("Erro ao buscar linguagens do GitHub para '{}/{}': {}", owner, repo, e.getMessage());
            return Collections.emptyList();
        }
    }

    public List<GithubRepoResponse> fetchUserRepos(String username, String type, String sort, int perPage) {
        try {
            List<GithubRepoResponse> response = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/users/{username}/repos")
                            .queryParam("type", type)
                            .queryParam("sort", sort)
                            .queryParam("per_page", perPage)
                            .build(username))
                    .retrieve()
                    .body(new ParameterizedTypeReference<List<GithubRepoResponse>>() {});
            
            return response != null ? response : Collections.emptyList();
        } catch (Exception e) {
            log.warn("Erro ao buscar repositórios do usuário '{}': {}", username, e.getMessage());
            return Collections.emptyList();
        }
    }
}
