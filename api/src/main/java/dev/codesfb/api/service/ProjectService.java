package dev.codesfb.api.service;

import dev.codesfb.api.client.GithubClient;
import dev.codesfb.api.client.GithubRepoResponse;
import dev.codesfb.api.domain.Project;
import dev.codesfb.api.domain.ProjectMedia;
import dev.codesfb.api.domain.ProjectStatus;
import dev.codesfb.api.dto.CreateProjectRequest;
import dev.codesfb.api.dto.MediaDto;
import dev.codesfb.api.dto.ProjectDto;
import dev.codesfb.api.dto.UpdateProjectRequest;
import dev.codesfb.api.mapper.ProjectMapper;
import dev.codesfb.api.repository.ProjectRepository;
import dev.codesfb.api.storage.MediaStorage;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private static final Logger log = LoggerFactory.getLogger(ProjectService.class);

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final GithubClient githubClient;
    private final MediaStorage mediaStorage;

    public ProjectService(
            ProjectRepository projectRepository,
            ProjectMapper projectMapper,
            GithubClient githubClient,
            MediaStorage mediaStorage
    ) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.githubClient = githubClient;
        this.mediaStorage = mediaStorage;
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> listProjects() {
        return projectRepository.findAllOrderedWithMedia().stream()
                .map(projectMapper::toCardDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findByIdWithMedia(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com id: " + id));
        return projectMapper.toDetailDto(project);
    }

    @Transactional
    public ProjectDto createProject(CreateProjectRequest request) {
        if (projectRepository.findByGithubRepo(request.githubRepo()).isPresent()) {
            throw new IllegalArgumentException("Projeto já cadastrado com o repositório: " + request.githubRepo());
        }

        Project project = new Project();
        project.setGithubRepo(request.githubRepo().trim());
        project.setTitle(request.title().trim());
        project.setDescription(request.description());
        project.setSiteUrl(request.siteUrl());
        project.setDownloadUrl(request.downloadUrl());
        project.setDetailsUrl(request.detailsUrl());
        project.setStatus(request.status() != null ? request.status() : ProjectStatus.EM_ANDAMENTO);
        project.setFeatured(Boolean.TRUE.equals(request.featured()));
        if (request.tags() != null) {
            project.setTags(request.tags());
        }

        String repoUrl = request.repoUrl();
        if (repoUrl == null || repoUrl.isBlank()) {
            repoUrl = "https://github.com/" + project.getGithubRepo();
        }
        project.setRepoUrl(repoUrl);

        // Tenta sincronizar os metadados do GitHub antes de salvar
        syncProjectWithGithub(project);

        Project saved = projectRepository.save(project);
        return projectMapper.toDetailDto(saved);
    }

    @Transactional
    public ProjectDto updateProject(Long id, UpdateProjectRequest request) {
        Project project = projectRepository.findByIdWithMedia(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com id: " + id));

        project.setTitle(request.title().trim());
        if (request.description() != null) {
            project.setDescription(request.description());
        }
        project.setSiteUrl(request.siteUrl());
        project.setDownloadUrl(request.downloadUrl());
        project.setDetailsUrl(request.detailsUrl());
        if (request.status() != null) {
            project.setStatus(request.status());
        }
        if (request.featured() != null) {
            project.setFeatured(request.featured());
        }
        if (request.tags() != null) {
            project.setTags(request.tags());
        }

        Project saved = projectRepository.save(project);
        return projectMapper.toDetailDto(saved);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findByIdWithMedia(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com id: " + id));

        // Remove os arquivos físicos das mídias associadas
        for (ProjectMedia media : project.getMedia()) {
            mediaStorage.delete(media.getUrl());
        }

        projectRepository.delete(project);
    }

    @Transactional
    public MediaDto addMedia(Long projectId, MultipartFile file, String alt) {
        Project project = projectRepository.findByIdWithMedia(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com id: " + projectId));

        String contentType = file.getContentType();
        String type = (contentType != null && contentType.startsWith("video")) ? "video" : "image";

        String relativeUrl = mediaStorage.store(file, projectId);

        int nextPosition = project.getMedia().stream()
                .mapToInt(ProjectMedia::getPosition)
                .max()
                .orElse(-1) + 1;

        ProjectMedia media = new ProjectMedia(type, relativeUrl, alt, nextPosition);
        project.addMedia(media);

        projectRepository.save(project);
        return projectMapper.toMediaDto(media);
    }

    /**
     * Sincronização periódica com o GitHub.
     * fixedDelayString configurável (padrão: a cada 1 hora).
     */
    @Scheduled(fixedDelayString = "${app.github.sync-interval:3600000}")
    @Transactional
    public void syncAllScheduled() {
        log.info("Iniciando rotina agendada de sincronização com o GitHub...");
        syncAll();
    }

    @Transactional
    public int syncAll() {
        List<Project> projects = projectRepository.findAll();
        int successCount = 0;

        for (Project project : projects) {
            try {
                if (syncProjectWithGithub(project)) {
                    successCount++;
                }
            } catch (Exception e) {
                log.error("Erro inesperado ao sincronizar projeto '{}': {}", project.getGithubRepo(), e.getMessage());
            }
        }

        projectRepository.saveAll(projects);
        log.info("Sincronização concluída: {}/{} projetos atualizados com sucesso.", successCount, projects.size());
        return successCount;
    }

    private boolean syncProjectWithGithub(Project project) {
        String repoFullName = project.getGithubRepo();
        if (repoFullName == null || !repoFullName.contains("/")) {
            log.warn("Repositório inválido para sincronização: '{}'", repoFullName);
            return false;
        }

        String[] parts = repoFullName.split("/", 2);
        String owner = parts[0].trim();
        String repo = parts[1].trim();

        Optional<GithubRepoResponse> repoOpt = githubClient.fetchRepo(owner, repo);
        if (repoOpt.isEmpty()) {
            log.warn("Falha ao obter dados do GitHub para '{}'. Mantendo dados atuais.", repoFullName);
            return false;
        }

        GithubRepoResponse info = repoOpt.get();
        if (info.stargazersCount() != null) {
            project.setStars(info.stargazersCount());
        }
        if (info.pushedAt() != null) {
            project.setGithubUpdatedAt(info.pushedAt());
        }
        if ((project.getDescription() == null || project.getDescription().isBlank()) && info.description() != null) {
            project.setDescription(info.description());
        }
        if (project.getRepoUrl() == null || project.getRepoUrl().isBlank()) {
            project.setRepoUrl(info.htmlUrl() != null ? info.htmlUrl() : "https://github.com/" + repoFullName);
        }

        List<String> langs = githubClient.fetchLanguages(owner, repo);
        if (!langs.isEmpty()) {
            project.setLanguages(langs);
        }

        project.setSyncedAt(OffsetDateTime.now(ZoneOffset.UTC));
        return true;
    }
}
