# Technical Decisions

Record significant decisions, their context, alternatives considered, and consequences.

## 2026-11-04: Back-end Spring Boot para Portfólio de Projetos

### Context
O portfólio precisava de uma API robusta para gerenciamento de projetos com sincronização de metadados do GitHub (estrelas, linguagens, data de atualização), persistência relacional no PostgreSQL e suporte a upload de mídias (imagens/vídeos), mantendo integração com o front-end React.

### Decisions
1. **Spring Boot 4.1.1 + Java 26**:
   - O ambiente host possui OpenJDK 26 (`26.0.1`).
   - Configuração do Maven Compiler com `release 21` compatível com a baseline do Spring Boot 4.1.
   - Adoção dos starter modules modernos de teste (`spring-boot-starter-webmvc-test` e `spring-boot-starter-security-test`).
2. **PostgreSQL com Flyway**:
   - Migrations versionadas em `src/main/resources/db/migration/V1__projects.sql`.
   - Utilização de `text[]` para tags e `jsonb` para a lista de linguagens, mapeadas no Hibernate através de `@JdbcTypeCode(SqlTypes.ARRAY)` e `@JdbcTypeCode(SqlTypes.JSON)`.
3. **Mapeamento de Mídias e Resolução de URLs**:
   - `MediaStorage` desacoplado em interface com implementação `FileSystemMediaStorage`.
   - Armazenamento em diretório configurável via `${MEDIA_DIR}` e servido via `WebMvcConfigurer.addResourceHandlers` em `/media/**`.
   - URLs de mídia retornadas pelo `ProjectMapper` são resolvidas de forma absoluta usando `app.base-url`.
4. **Sincronização com GitHub**:
   - Implementada com `RestClient` em `GithubClient`, com suporte a token de autenticação opcional para aumento de rate limit.
   - Rotina periódica via `@Scheduled` configurável com fallback seguro em caso de indisponibilidade individual de repositório.
5. **Segurança e Proteção Administrativa**:
   - Rotas de leitura (`GET /api/projects/**`, `/media/**`, `/health`) públicas com header `Cache-Control: max-age=60, public`.
   - Rotas de mutação (`/api/admin/**`) protegidas por HTTP Basic Auth configurável por `ADMIN_USER` e `ADMIN_PASSWORD`.
6. **Resiliência do Front-end**:
   - Criação de `useProjects()` hook em React que busca da API `/api/projects` e faz fallback transparente para os dados mockados em `web/src/data/projects.ts` se a API ou banco estiverem indisponíveis.

## 2026-11-09: Migração do Front-end para Next.js (App Router)

### Context
O front-end utilizava Vite com SPA pura (`react-router-dom`), sem renderização no servidor (SSR) nem otimizações automáticas de SEO e imagens. A necessidade de suporte a SSR, prefetch inteligente de rotas, metadados dinâmicos e deploy facilitado motivou a migração para Next.js.

### Decisions
1. **Next.js 16 + React 19 + App Router**:
   - Adoção da estrutura baseada em pastas em `src/app/` (`layout.tsx`, `page.tsx`, `not-found.tsx`).
   - As antigas telas foram organizadas como visualizações modulares em `src/views/` para evitar colisão com o Pages Router legado.
2. **Tailwind CSS v4 via PostCSS**:
   - Migração do `@tailwindcss/vite` para `@tailwindcss/postcss` com `postcss.config.mjs`.
3. **Segurança de SSR e Hidratação**:
   - Sincronização segura de tema no `ThemeContext` com fallback em SSR e checagem de `typeof window !== 'undefined'`.
   - Script inline no `<head>` do `RootLayout` para prevenção de flicker (FOUC) com `suppressHydrationWarning`.
4. **Variáveis de Ambiente**:
   - Migração de `VITE_*` e `import.meta.env` para `NEXT_PUBLIC_*` e `process.env`.
5. **Otimização de Imagens**:
   - Adoção do `next/image` nos cards de projetos (`ProjectCard.tsx`) com suporte configurado a domínios remotos (Unsplash).
