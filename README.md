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

1. Copie o arquivo de exemplo: `cp .env.example .env`.
2. Ajuste os valores locais, se necessário.
3. Inicie o PostgreSQL: `docker compose up -d`.

## Desenvolvimento

Depois de inicializar os projetos em `web/` e `api/`, execute os comandos específicos de cada aplicação a partir de suas respectivas pastas.
