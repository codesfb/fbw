# FBW

Monorepo do FBW, organizado em aplicação web, API e documentação.

## Estrutura

- `web/` — React + TypeScript, criado com Vite.
- `api/` — API Spring Boot com Maven.
- `docs/` — contrato da API, decisões técnicas e ideias futuras.
- `.github/workflows/` — pipelines de integração contínua.

## Pré-requisitos

- Node.js 20+
- Java 21+
- Docker e Docker Compose

## Banco de dados local

1. Copie `.env.example` para `.env` (`Copy-Item .env.example .env` no PowerShell).
2. Troque `POSTGRES_PASSWORD` por uma senha local sua. `.env` é ignorado pelo Git.
3. Inicie PostgreSQL e API: `docker compose up --build -d`.
4. Verifique a API em `http://localhost:8080/health`; a resposta esperada é HTTP 200 com `{"status":"UP"}`.

Para acompanhar a inicialização: `docker compose logs -f api`.
Para parar os serviços preservando os dados: `docker compose down`.

Também é possível iniciar apenas o banco com `docker compose up -d postgres` e executar a API localmente em `api/` com `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`). Nesse caso, configure `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT` e `API_PORT` no ambiente da IDE/terminal; o Maven não carrega `.env` automaticamente.

## Desenvolvimento

Para iniciar o frontend, execute os comandos específicos em `web/`.
