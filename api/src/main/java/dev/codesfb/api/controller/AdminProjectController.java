package dev.codesfb.api.controller;

import dev.codesfb.api.dto.CreateProjectRequest;
import dev.codesfb.api.dto.MediaDto;
import dev.codesfb.api.dto.ProjectDto;
import dev.codesfb.api.dto.UpdateProjectRequest;
import dev.codesfb.api.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminProjectController {

    private final ProjectService projectService;

    public AdminProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectDto> createProject(@Valid @RequestBody CreateProjectRequest request) {
        ProjectDto created = projectService.createProject(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectDto> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProjectRequest request
    ) {
        ProjectDto updated = projectService.updateProject(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/projects/{id}/media", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MediaDto> uploadMedia(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "alt", required = false) String alt
    ) {
        MediaDto media = projectService.addMedia(id, file, alt);
        return ResponseEntity.status(HttpStatus.CREATED).body(media);
    }

    @PostMapping("/sync")
    public ResponseEntity<Map<String, Object>> forceSync() {
        int synced = projectService.syncAll();
        return ResponseEntity.ok(Map.of(
                "message", "Sincronização executada com sucesso",
                "syncedCount", synced
        ));
    }
}
