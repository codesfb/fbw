# Instructions for AI agents

Read this file and `README.md` before changing the project. Check [`docs/progress.md`](docs/progress.md) for the current project state. Read [`docs/decisions.md`](docs/decisions.md) before proposing architectural changes and [`docs/api-contract.md`](docs/api-contract.md) when working on the API.

## Projeto

- This monorepo contains the web app in `web/`, the API in `api/`, and documentation in `docs/`.
- The frontend uses React, TypeScript, and Vite. Its page is intentionally blank as a starting point for the new site.
- The API uses Java, Spring Boot, and Maven. The existing endpoint is `GET /health`.
- PostgreSQL is the database used by the API in development and in Docker Compose.

## Working guidelines

- Understand the code and current Git state before editing; preserve existing local changes.
- Prefer small changes that follow the project's existing patterns and dependencies.
- Do not add dependencies or architectural layers without a concrete need.
- Keep documentation and code aligned. Record lasting decisions in `docs/decisions.md` and completion status or next steps in `docs/progress.md`.
- Do not commit secrets. Use a local `.env` based on `.env.example`.
- When a task is complete, report changed files and checks performed. Explain why if a check could not be run.
- Keep repository documentation and agent instructions in English. Write website UI and user-facing site content in Brazilian Portuguese (`pt-BR`) unless the product requirements say otherwise.

## Comandos

Frontend commands, run from `web/`:

```bash
npm ci
npm run dev
npm run lint
npm run build
```

API commands, run from `api/`:

```bash
./mvnw spring-boot:run
./mvnw test
./mvnw package
```

Database and API via Docker Compose, run from the repository root:

```bash
docker compose up --build -d
docker compose logs -f api
docker compose down
```
