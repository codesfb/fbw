CREATE TABLE project (
    id BIGSERIAL PRIMARY KEY,
    github_repo VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(120) NOT NULL,
    description TEXT,
    repo_url VARCHAR(300),
    site_url VARCHAR(300),
    download_url VARCHAR(300),
    details_url VARCHAR(300),
    status VARCHAR(20) NOT NULL DEFAULT 'em-andamento' CHECK (status IN ('concluido', 'em-andamento', 'arquivado')),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    tags TEXT[] NOT NULL DEFAULT '{}',
    languages JSONB NOT NULL DEFAULT '[]',
    stars INT,
    github_updated_at TIMESTAMPTZ,
    synced_at TIMESTAMPTZ
);

CREATE TABLE project_media (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    url VARCHAR(500) NOT NULL,
    alt VARCHAR(200),
    position INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_project_featured_updated ON project (featured DESC, github_updated_at DESC NULLS LAST);
CREATE INDEX idx_project_media_project_position ON project_media (project_id, position ASC);
