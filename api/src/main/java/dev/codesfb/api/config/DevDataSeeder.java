package dev.codesfb.api.config;

import dev.codesfb.api.domain.Project;
import dev.codesfb.api.domain.ProjectMedia;
import dev.codesfb.api.domain.ProjectStatus;
import dev.codesfb.api.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Component
@Profile({"dev", "local"})
public class DevDataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DevDataSeeder.class);
    private final ProjectRepository projectRepository;

    public DevDataSeeder(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) {
        if (projectRepository.count() > 0) {
            log.info("Base de dados de desenvolvimento já populada. Pulando seed.");
            return;
        }

        log.info("Base de dados vazia. Use o endpoint POST /api/admin/import para importar seus repositórios do GitHub.");
        log.info("Exemplo: curl -X POST 'http://localhost:8080/api/admin/import?limit=10' -u admin:admin");
    }
}
