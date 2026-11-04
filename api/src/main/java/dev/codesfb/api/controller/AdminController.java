package dev.codesfb.api.controller;

import dev.codesfb.api.dto.ImportResult;
import dev.codesfb.api.service.GithubImportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final GithubImportService githubImportService;

    public AdminController(GithubImportService githubImportService) {
        this.githubImportService = githubImportService;
    }

    @PostMapping("/import")
    public ResponseEntity<ImportResult> importRepositories(
            @RequestParam(defaultValue = "4") int limit
    ) {
        ImportResult result = githubImportService.importFromGithub("codesfb", limit);
        return ResponseEntity.ok(result);
    }
}
