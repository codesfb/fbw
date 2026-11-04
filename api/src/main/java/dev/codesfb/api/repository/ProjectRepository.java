package dev.codesfb.api.repository;

import dev.codesfb.api.domain.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @EntityGraph(attributePaths = {"media"})
    @Query("SELECT p FROM Project p ORDER BY p.featured DESC, p.githubUpdatedAt DESC NULLS LAST, p.id DESC")
    List<Project> findAllOrderedWithMedia();

    @EntityGraph(attributePaths = {"media"})
    @Query("SELECT p FROM Project p WHERE p.id = :id")
    Optional<Project> findByIdWithMedia(@Param("id") Long id);

    Optional<Project> findByGithubRepo(String githubRepo);
    
    boolean existsByGithubRepo(String githubRepo);
}
