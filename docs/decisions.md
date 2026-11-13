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

## 2026-11-12: Redesign e Interatividade da Home (Mascote Menon, Modal Sobre, Linha do Tempo e Blog)

### Context
A página Home necessitava de refinamentos visuais e ergonômicos: um bloco Sobre em formato de modal emoldurado e centralizado, tipografia elegante em itálico para o título, interação viva com o mascote Menon reagindo a eventos e hovers, padronização nos botões e correção de hover bugs, visualização horizontal da linha do tempo com prévia desfocada, alinhamento dimensional dos cards de projetos e uma nova seção de artigos (Blog) com prévia modal.

### Decisions
1. **Tipografia do Bloco Sobre**:
   - Introdução da Google Font `Newsreader` (variável `--font-serif-elegant`) com estilo itálico no Next.js App Router para contrastar com o restante da interface monoespaçada.
2. **Coordenação Global do Mascote Menon via `MascotContext`**:
   - Criação do `MascotContext` para centralizar estados (`dormindo`, `idle`, `falando`), mensagens de balão (tooltip) e transições temporizadas.
   - Boas-vindas automáticas ao entrar na Home com retorno suave para o estado dormente.
   - Mensagens contextuais em hover sobre botões e cards, com retorno ao sono após `mouseleave`.
   - Acessibilidade preservada em telas de toque através de interação direta no mascote.
3. **Padronização de Botões e Resolução de Hover**:
   - Uniformização de alturas e paddings (`sm`: `h-8`, `md`: `h-9`, `lg`: `h-10`).
   - Substituição de regras conflitantes por tokens semânticos (`var(--text-primary)`, `var(--text-inverse)`, `var(--border-primary)` e `var(--shadow-hover-sm)`), eliminando o bug de desaparecimento em hover.
4. **Timeline Horizontal com Efeito de Fade/Blur**:
   - Componente `Timeline` adaptado para suportar `layout="horizontal"`, apresentando um trilho contínuo horizontal com nós pontilhados e suporte a rolagem.
   - Na Home, uma máscara com `backdrop-blur` esconde os itens finais e exibe o botão "Ver mais" direcionando para a trajetória completa em `/sobre`.
5. **Navegação com Prévias Modais sem Saída da Home**:
   - Cards de projetos e posts de blog abrem modais de prévia ao clicar (suportando teclado e fechamento via `Esc`, `X` ou backdrop).
   - Modais incluem botão de ação secundária "Abrir página completa" para roteamento tradicional.
   - Seções da Home incluem o botão "Ver tudo →" no cabeçalho.
