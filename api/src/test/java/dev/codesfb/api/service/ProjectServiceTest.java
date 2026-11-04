package dev.codesfb.api.service;

import dev.codesfb.api.client.GithubClient;
import dev.codesfb.api.domain.Project;
import dev.codesfb.api.domain.ProjectMedia;
import dev.codesfb.api.domain.ProjectStatus;
import dev.codesfb.api.dto.ProjectDto;
import dev.codesfb.api.mapper.ProjectMapper;
import dev.codesfb.api.repository.ProjectRepository;
import dev.codesfb.api.storage.MediaStorage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private GithubClient githubClient;

    @Mock
    private MediaStorage mediaStorage;

    private ProjectMapper projectMapper;
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        projectMapper = new ProjectMapper("http://localhost:8080");
        projectService = new ProjectService(projectRepository, projectMapper, githubClient, mediaStorage);
    }

    @Test
    @DisplayName("Deve listar projetos com destaque primeiro e mapear a primeira mídia como capa")
    void shouldListProjectsWithFeaturedFirstAndMapCoverMedia() {
        // Arrange
        Project featuredProject = new Project("codesfb/featured", "Projeto Destaque");
        featuredProject.setId(1L);
        featuredProject.setFeatured(true);
        featuredProject.setStatus(ProjectStatus.CONCLUIDO);
        featuredProject.setGithubUpdatedAt(OffsetDateTime.of(2026, 10, 1, 10, 0, 0, 0, ZoneOffset.UTC));
        featuredProject.setLanguages(List.of("TypeScript", "React"));

        ProjectMedia m1 = new ProjectMedia("image", "/media/p1_cover.webp", "Capa", 0);
        ProjectMedia m2 = new ProjectMedia("image", "/media/p1_extra.webp", "Galeria", 1);
        featuredProject.addMedia(m1);
        featuredProject.addMedia(m2);

        Project regularProject = new Project("codesfb/regular", "Projeto Recente");
        regularProject.setId(2L);
        regularProject.setFeatured(false);
        regularProject.setStatus(ProjectStatus.EM_ANDAMENTO);
        regularProject.setGithubUpdatedAt(OffsetDateTime.of(2026, 11, 1, 10, 0, 0, 0, ZoneOffset.UTC));
        regularProject.setLanguages(List.of("Rust"));

        when(projectRepository.findAllOrderedWithMedia()).thenReturn(List.of(featuredProject, regularProject));

        // Act
        List<ProjectDto> result = projectService.listProjects();

        // Assert
        assertThat(result).hasSize(2);

        // Primeiro deve ser o em destaque
        ProjectDto first = result.get(0);
        assertThat(first.id()).isEqualTo(1L);
        assertThat(first.title()).isEqualTo("Projeto Destaque");
        assertThat(first.featured()).isTrue();
        assertThat(first.media()).isNotNull();
        assertThat(first.media().src()).isEqualTo("http://localhost:8080/media/p1_cover.webp");
        assertThat(first.media().type()).isEqualTo("image");
        // Card não deve expor gallery por padrão para economizar payload
        assertThat(first.gallery()).isNull();

        // Segundo deve ser o regular
        ProjectDto second = result.get(1);
        assertThat(second.id()).isEqualTo(2L);
        assertThat(second.title()).isEqualTo("Projeto Recente");
        assertThat(second.featured()).isFalse();
        assertThat(second.media()).isNull();
    }
}
