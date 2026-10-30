# Project Progress

Last updated: 2026-10-30

## Current state

- The repository is a monorepo split into `web/`, `api/`, and `docs/`.
- The React and TypeScript frontend is set up with Vite and Tailwind CSS v4. The page currently shows only “Em desenvolvimento” centered on a white background. Website content is in Brazilian Portuguese (`pt-BR`).
- The Spring Boot API has a `GET /health` endpoint that responds with `{"status":"UP"}`. Security allows this endpoint and requires HTTP Basic authentication for other endpoints.
- Docker Compose configures PostgreSQL and the API. See `README.md` and `.env.example` to start the local environment.
- The technical decisions and API contract documents exist, but currently contain only prompts for future documentation.

## Next steps

1. Define the new site's content and visual direction.
2. Build the page structure and components around the agreed requirements.
3. Update `docs/api-contract.md` when new endpoints are defined or implemented.

## Checks

- `npm run build` and `npm run lint` in `web/` pass with the current frontend.
- API test and build commands are `./mvnw test` and `./mvnw package`, run from `api/`.
- When updating this file, record checks performed and any limitations that affected validation during the session.
