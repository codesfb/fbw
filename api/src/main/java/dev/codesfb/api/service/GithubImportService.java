package dev.codesfb.api.service;

import dev.codesfb.api.client.GithubClient;
import dev.codesfb.api.client.GithubRepoResponse;
import dev.codesfb.api.domain.Project;
import dev.codesfb.api.domain.ProjectStatus;
import dev.codesfb.api.dto.ImportResult;
import dev.codesfb.api.dto.ProjectDto;
import dev.codesfb.api.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class GithubImportService {

    private static final Logger log = LoggerFactory.getLogger(GithubImportService.class);

    private final GithubClient githubClient;
    private final ProjectRepository projectRepository;

    public GithubImportService(GithubClient githubClient, ProjectRepository projectRepository) {
        this.githubClient = githubClient;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ImportResult importFromGithub(String username, int limit) {
        log.info("Iniciando importação de repositórios do GitHub para o usuário '{}' com limite de {}", username, limit);

        // Busca repositórios do GitHub
        List<GithubRepoResponse> repos = githubClient.fetchUserRepos(username, "owner", "pushed", 20);

        // Filtra forks e arquivados
        List<GithubRepoResponse> filteredRepos = repos.stream()
                .filter(repo -> !Boolean.TRUE.equals(repo.fork()))
                .filter(repo -> !Boolean.TRUE.equals(repo.archived()))
                .limit(limit)
                .toList();

        List<ProjectDto> created = new ArrayList<>();
        List<String> ignored = new ArrayList<>();

        for (GithubRepoResponse repo : filteredRepos) {
            String githubRepo = repo.fullName();

            // Verifica se já existe
            if (projectRepository.existsByGithubRepo(githubRepo)) {
                log.debug("Repositório '{}' já existe no banco de dados, ignorando", githubRepo);
                ignored.add(githubRepo);
                continue;
            }

            // Busca as linguagens
            String[] parts = githubRepo.split("/");
            List<String> languages = parts.length == 2 
                ? githubClient.fetchLanguages(parts[0], parts[1]) 
                : List.of();

            // Cria o projeto
            Project project = new Project(githubRepo, repo.name());
            project.setDescription(repo.description());
            project.setRepoUrl(repo.htmlUrl());
            
            // Define siteUrl apenas se homepage não estiver vazio
            if (repo.homepage() != null && !repo.homepage().isBlank()) {
                project.setSiteUrl(repo.homepage());
            }
            
            project.setStatus(ProjectStatus.EM_ANDAMENTO);
            project.setTags(repo.topics() != null ? repo.topics() : List.of());
            project.setLanguages(languages);
            project.setStars(repo.stargazersCount());
            project.setGithubUpdatedAt(repo.updatedAt());

            Project saved = projectRepository.save(project);
            log.info("Repositório '{}' importado com sucesso (ID: {})", githubRepo, saved.getId());

            created.add(ProjectDto.fromEntity(saved));
        }

        log.info("Importação concluída: {} criados, {} ignorados", created.size(), ignored.size());
        return ImportResult.of(created, ignored);
    }
}
