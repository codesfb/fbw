# Portfolio API Contract

Documentação dos endpoints da API REST do Portfólio desenvolvida com Java + Spring Boot.

## Base URL
- Desenvolvimento local: `http://localhost:8080`
- Prefixo público da API: `/api`
- Arquivos de mídia estática: `/media/{filename}`

---

## 1. Endpoints Públicos

### `GET /api/projects`
Retorna a lista de projetos ordenados por:
1. `featured DESC` (projetos em destaque primeiro)
2. `github_updated_at DESC NULLS LAST` (repositórios mais recentemente atualizados)

**Headers de Resposta:**
- `Cache-Control: max-age=60, public`

#### Resposta de Exemplo (JSON):
```json
[
  {
    "id": 1,
    "title": "Portal Dev Community",
    "description": "Plataforma completa para compartilhamento de artigos, snippets e discussões técnicas.",
    "repoUrl": "https://github.com/codesfb/dev-community",
    "languages": ["TypeScript", "React", "Tailwind CSS"],
    "updatedAt": "2026-11-04T12:00:00Z",
    "status": "concluido",
    "siteUrl": "https://dev-community.demo.app",
    "media": {
      "type": "image",
      "src": "http://localhost:8080/media/proj_1_cover.webp",
      "alt": "Interface do portal com editor de código"
    },
    "tags": ["web", "fullstack", "react"],
    "featured": true,
    "stars": 128
  }
]
```

*Nota: Campos nulos são omitidos do JSON (`spring.jackson.default-property-inclusion=non_null`).*

#### Exemplo cURL:
```bash
curl -i http://localhost:8080/api/projects
```

---

### `GET /api/projects/{id}`
Retorna os detalhes de um projeto específico, incluindo a galeria completa de mídias (`gallery`).

#### Resposta de Exemplo (JSON):
```json
{
  "id": 1,
  "title": "Portal Dev Community",
  "description": "Plataforma completa para compartilhamento de artigos, snippets e discussões técnicas.",
  "repoUrl": "https://github.com/codesfb/dev-community",
  "languages": ["TypeScript", "React", "Tailwind CSS"],
  "updatedAt": "2026-11-04T12:00:00Z",
  "status": "concluido",
  "siteUrl": "https://dev-community.demo.app",
  "media": {
    "type": "image",
    "src": "http://localhost:8080/media/proj_1_cover.webp",
    "alt": "Interface do portal"
  },
  "tags": ["web", "fullstack", "react"],
  "featured": true,
  "stars": 128,
  "gallery": [
    {
      "type": "image",
      "src": "http://localhost:8080/media/proj_1_cover.webp",
      "alt": "Interface do portal"
    },
    {
      "type": "image",
      "src": "http://localhost:8080/media/proj_1_dashboard.webp",
      "alt": "Painel administrativo"
    }
  ]
}
```

#### Exemplo cURL:
```bash
curl -i http://localhost:8080/api/projects/1
```

---

## 2. Endpoints Administrativos (Protegidos por Basic Auth)

As rotas sob `/api/admin/**` exigem autenticação HTTP Basic (`ADMIN_USER` e `ADMIN_PASSWORD`).

### `POST /api/admin/projects`
Cadastra um novo projeto. Faz tentativa de busca inicial de metadados no GitHub automaticamente.

#### Requisição:
```json
{
  "githubRepo": "codesfb/novo-projeto",
  "title": "Novo Projeto Incrível",
  "description": "Descrição customizada",
  "siteUrl": "https://novo-projeto.app",
  "status": "em-andamento",
  "featured": true,
  "tags": ["cloud", "docker"]
}
```

#### Exemplo cURL:
```bash
curl -i -u admin:admin -X POST http://localhost:8080/api/admin/projects \
  -H "Content-Type: application/json" \
  -d '{
    "githubRepo": "codesfb/novo-projeto",
    "title": "Novo Projeto Incrível",
    "status": "em-andamento",
    "featured": true,
    "tags": ["cloud", "docker"]
  }'
```

---

### `PUT /api/admin/projects/{id}`
Atualiza os dados cadastrais manuais do projeto.

#### Exemplo cURL:
```bash
curl -i -u admin:admin -X PUT http://localhost:8080/api/admin/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Portal Dev Community - Atualizado",
    "siteUrl": "https://community.codesfb.dev",
    "status": "concluido",
    "featured": true,
    "tags": ["react", "vite", "tailwind"]
  }'
```

---

### `DELETE /api/admin/projects/{id}`
Exclui um projeto e remove seus arquivos físicos de mídia do disco.

#### Exemplo cURL:
```bash
curl -i -u admin:admin -X DELETE http://localhost:8080/api/admin/projects/1
```

---

### `POST /api/admin/projects/{id}/media` (Multipart Upload)
Realiza o upload de imagens (`jpeg`, `png`, `webp`) ou vídeos (`mp4`, `webm`) vinculando-os ao projeto.

#### Exemplo cURL:
```bash
curl -i -u admin:admin -X POST http://localhost:8080/api/admin/projects/1/media \
  -F "file=@/caminho/para/screenshot.webp" \
  -F "alt=Captura de tela do painel"
```

---

### `POST /api/admin/sync`
Força a sincronização imediata de estrelas, linguagens e datas de modificação com a API do GitHub para todos os projetos cadastrados.

#### Exemplo cURL:
```bash
curl -i -u admin:admin -X POST http://localhost:8080/api/admin/sync
```
