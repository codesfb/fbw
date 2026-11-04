package dev.codesfb.api.controller;

import dev.codesfb.api.domain.ProjectStatus;
import dev.codesfb.api.dto.MediaDto;
import dev.codesfb.api.dto.ProjectDto;
import dev.codesfb.api.service.ProjectService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    @Test
    @DisplayName("GET /api/projects deve retornar HTTP 200, header Cache-Control e JSON no formato correto")
    void shouldReturnProjectsListWithCacheControl() throws Exception {
        ProjectDto sample = new ProjectDto(
                1L,
                "Portal Dev Community",
                "Descrição do projeto",
                "https://github.com/codesfb/dev-community",
                List.of("TypeScript", "React"),
                OffsetDateTime.of(2026, 11, 4, 12, 0, 0, 0, ZoneOffset.UTC),
                ProjectStatus.CONCLUIDO,
                "https://demo.codesfb.dev",
                null,
                null,
                new MediaDto("image", "http://localhost:8080/media/test.webp", "Preview"),
                List.of("web", "fullstack"),
                true,
                150,
                null
        );

        when(projectService.listProjects()).thenReturn(List.of(sample));

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(header().string("Cache-Control", containsString("max-age=60")))
                .andExpect(header().string("Cache-Control", containsString("public")))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Portal Dev Community"))
                .andExpect(jsonPath("$[0].status").value("concluido"))
                .andExpect(jsonPath("$[0].languages[0]").value("TypeScript"))
                .andExpect(jsonPath("$[0].featured").value(true))
                .andExpect(jsonPath("$[0].media.src").value("http://localhost:8080/media/test.webp"))
                .andExpect(jsonPath("$[0].downloadUrl").doesNotExist()); // Campos nulos devem ser omitidos
    }

    @Test
    @DisplayName("POST /api/admin/projects sem autenticação deve retornar HTTP 401")
    void shouldBlockUnauthenticatedAdminAccess() throws Exception {
        mockMvc.perform(post("/api/admin/projects"))
                .andExpect(status().isUnauthorized());
    }
}
