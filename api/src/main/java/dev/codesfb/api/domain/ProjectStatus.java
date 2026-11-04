package dev.codesfb.api.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProjectStatus {
    CONCLUIDO("concluido"),
    EM_ANDAMENTO("em-andamento"),
    ARQUIVADO("arquivado");

    private final String value;

    ProjectStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static ProjectStatus fromValue(String value) {
        if (value == null) {
            return null;
        }
        for (ProjectStatus status : values()) {
            if (status.value.equalsIgnoreCase(value) || status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status de projeto inválido: " + value);
    }
}
