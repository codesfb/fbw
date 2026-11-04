package dev.codesfb.api.storage;

import org.springframework.web.multipart.MultipartFile;

public interface MediaStorage {

    /**
     * Armazena o arquivo multipart de mídia e retorna a URL relativa para acesso.
     * Exemplo: /media/project-1-a1b2c3d4.png
     */
    String store(MultipartFile file, Long projectId);

    /**
     * Remove o arquivo caso necessário.
     */
    void delete(String mediaUrl);
}
