package dev.codesfb.api.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class FileSystemMediaStorage implements MediaStorage {

    private final Path rootLocation;
    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(
            Arrays.asList("jpg", "jpeg", "png", "webp", "mp4", "webm")
    );
    private static final Set<String> ALLOWED_CONTENT_TYPES = new HashSet<>(
            Arrays.asList(
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "video/mp4",
                    "video/webm"
            )
    );

    public FileSystemMediaStorage(@Value("${app.media.dir:./uploads/media}") String mediaDir) {
        this.rootLocation = Paths.get(mediaDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.rootLocation);
        } catch (IOException e) {
            throw new IllegalStateException("Não foi possível inicializar o diretório de mídia: " + mediaDir, e);
        }
    }

    @Override
    public String store(MultipartFile file, Long projectId) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Arquivo de mídia vazio ou nulo.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "media");
        String extension = getFileExtension(originalFilename).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Extensão não permitida: " + extension + ". Use: " + ALLOWED_EXTENSIONS);
        }

        String contentType = file.getContentType();
        if (contentType != null && !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Tipo MIME não permitido: " + contentType);
        }

        String storedFileName = "proj_" + projectId + "_" + UUID.randomUUID().toString().substring(0, 8) + "." + extension;
        Path destinationFile = this.rootLocation.resolve(storedFileName).normalize().toAbsolutePath();

        if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
            throw new SecurityException("Tentativa de gravação fora do diretório permitido.");
        }

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Falha ao salvar o arquivo no disco.", e);
        }

        return "/media/" + storedFileName;
    }

    @Override
    public void delete(String mediaUrl) {
        if (mediaUrl == null || !mediaUrl.startsWith("/media/")) {
            return;
        }
        String fileName = mediaUrl.substring("/media/".length());
        Path file = this.rootLocation.resolve(fileName).normalize().toAbsolutePath();
        try {
            Files.deleteIfExists(file);
        } catch (IOException ignored) {
        }
    }

    public Path getRootLocation() {
        return rootLocation;
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "" : filename.substring(dotIndex + 1);
    }
}
