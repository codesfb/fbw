# FBW

FBW is a monorepo containing a web application, an API, and project documentation.

## Repository structure

- `web/` — React and TypeScript application built with Vite.
- `api/` — Spring Boot API built with Maven.
- `docs/` — API contract, technical decisions, future ideas, and project progress.
- `.github/workflows/` — continuous integration workflows.

## Requirements

- Node.js 20+
- Java 21+
- Docker and Docker Compose

## Local database and API

1. Copy `.env.example` to `.env` (`Copy-Item .env.example .env` in PowerShell).
2. Set `POSTGRES_PASSWORD` to a local password. `.env` is ignored by Git.
3. Start PostgreSQL and the API: `docker compose up --build -d`.
4. Check `http://localhost:8080/health`; the expected response is HTTP 200 with `{"status":"UP"}`.

Follow startup logs with `docker compose logs -f api`. Stop the services while keeping the data with `docker compose down`.

You can also start only the database with `docker compose up -d postgres` and run the API locally from `api/` with `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`). In this case, configure `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`, and `API_PORT` in your IDE or terminal environment. Maven does not load `.env` automatically.

## Web development

Run these commands from `web/`:

```bash
npm ci
npm run dev
npm run lint
npm run build
```

The website content and UI are intended to be written in Brazilian Portuguese (`pt-BR`). Repository documentation and agent instructions are maintained in English.
