# Progress Log

## 2026-11-12

### ✅ Redesign e Interatividade da Home (Mascote Menon, Modal Sobre, Linha do Tempo e Blog)
- **Modal Sobre na Home**: Bloco centralizado emoldurado com `max-w-2xl`, cantos arredondados, título em fonte elegante itálica (`Newsreader`), foto compacta no canto superior esquerdo e remoção do endereço de São Carlos. Botões padronizados para "Ver projetos", "Blog", "GitHub" e "LinkedIn".
- **Mascote Menon Dinâmico**: Integrado com `MascotContext`. Ao entrar na Home, desperta com mensagem de boas-vindas ("Olá! Bem-vindo ao meu espaço digital. 👾") e volta a dormir suavemente. Ao passar o mouse sobre botões e cards de projeto/blog, acorda com dicas em balão de fala e retorna ao sono no `mouseleave`. Interativo ao clique em telas touch.
- **Padronização de Botões e Correção de Hover**: Padronização precisa de alturas (`h-8`, `h-9`, `h-10`), paddings e tipografia mono. Correção do bug onde o botão `black` desaparecia ao passar o mouse.
- **Linha do Tempo Horizontal**: Implementação de visualização horizontal contínua em `Timeline.tsx` com nós pontilhados e botões de navegação. Na Home (`AboutPreviewSection.tsx`), adicionada máscara com blur gradiente na borda e botão "Ver mais" direcionando para `/sobre`.
- **Cards de Projetos Idênticos**: A seção de projetos da Home agora utiliza a mesma proporção e o mesmo componente `ProjectCard` da página `/projetos`, exibindo 4 destaques com imagem 16:9, badges e tags.
- **Nova Seção de Blog na Home**: Criada a seção `#blog` com 3 artigos mockados em `data/blog.ts`, cards técnicos com miniaturas gradiente e contadores de tempo de leitura. Integrada ao Navbar e scrollspy da Home.
- **Navegação com Prévias Modais**: Cliques em cards de projetos e de blog abrem modais de prévia rápida (`ProjectModal` e `BlogModal`) com suporte a teclado (`Esc`), botão `X`, backdrop click e ação "Abrir página completa". Cabeçalhos de seção possuem botão "Ver tudo →".
- **Checks**: `npm run lint`, `npx tsc --noEmit` e `npm run build` passaram com sucesso (10 páginas estáticas geradas).

## 2026-11-11

### ✅ Issues #10, #11 e #14 — Layout base, Home, Sobre e Contato
- **Layout base**: `Navbar` reescrita com Home, Sobre, Projetos, Blog, Contato e Login, menu hambúrguer no mobile, linha indicadora deslizante e `IntersectionObserver` para scrollspy na Home. Hash da URL atualizado via `history.replaceState` (sem reload). Indicador cinza na Home (prévia) e preto/branco nas páginas dedicadas.
- **Footer global** com e-mail, GitHub (`codesfb`) e LinkedIn, alimentado por `data/about.json`.
- **Páginas "Em construção"**: `/blog` e `/login` reutilizam `UnderConstruction` com botão de voltar para a Home.
- **#10 Home**: página única de rolagem com `#inicio`, `#sobre`, `#projetos` e `#contato`, `scroll-margin-top` e `scroll-behavior: smooth`. Hero com foto, apresentação e CTAs; `MascotSlot` com fala fixa e estrutura pronta para IA; prévia da timeline; projetos em destaque via `useProjects()` (API com fallback para os mocks); formulário de contato compartilhado.
- **#11 Sobre**: página `/sobre` com apresentação, foto, links de redes e timeline vertical alternada (coluna única no mobile) lida de `data/timeline.json`, com o nó "Agora" pulsando.
- **#14 Contato**: página `/contato` com canais diretos e formulário compartilhado com validação, honeypot, estados de carregamento/sucesso/erro e `sendContact()` mock isolado em `services/contact.ts`.
- **Acessibilidade e movimento**: `aria-current`, `aria-invalid`/`aria-describedby`, foco visível e `prefers-reduced-motion` respeitado globalmente.
- **Checks**: `npm run lint`, `npx tsc --noEmit` e `npm run build` executados com sucesso.

### 📝 Pendências de conteúdo
- Preencher os placeholders `[anos]`, `[ano de ingresso]`, `[período]` e `[itens]` em `web/src/data/timeline.json` (cada item tem um campo `todo`).
- Substituir `[seu-usuario]` do LinkedIn em `web/src/data/about.json` e confirmar o e-mail de contato.
- Definir o provedor de envio de e-mail e trocar o mock de `web/src/services/contact.ts`.

## 2026-11-09

### ✅ Migração Front-end: Vite + React para Next.js 16 (App Router)
- **Framework**: Migrado com sucesso de Vite + `react-router-dom` para Next.js 16 (App Router) com React 19.
- **Rotas**:
  - `/` (`src/app/page.tsx`)
  - `/projetos` (`src/app/projetos/page.tsx`)
  - `/contato`, `/blog`, `/sobre`
  - `/em-construcao` (`src/app/em-construcao/page.tsx`)
  - `not-found` com redirect para `/`
- **Tailwind CSS v4**: Integrado com `@tailwindcss/postcss` e `postcss.config.mjs`.
- **Imagens**: Migração de tags `<img>` para `next/image` nos cards de projetos (`ProjectCard.tsx`).
- **SSR & Hidratação**: `ThemeContext` adaptado com verificações de SSR e script inline anti-flicker em `RootLayout`.
- **Limpeza**: Removidos `vite.config.ts`, `index.html`, `main.tsx`, `App.tsx` e dependências não utilizadas (`vite`, `react-router-dom`, etc.).
- **Build & Lint**: `npm run build` e `npm run lint` executados com sucesso (100% estático/SSG compilado).

### ✅ Engrenagens ao lado do mascote
- Adicionadas duas engrenagens do SVG da branch `old` ao lado do mascote na página inicial e em `/em-construcao`.
- As engrenagens giram em sentidos opostos e respeitam a preferência por movimento reduzido.

---

## 2026-11-04

### ✅ Endpoint de Importação do GitHub Implementado
- **Endpoint**: `POST /api/admin/import?limit=N`
- **Autenticação**: Basic Auth (admin:admin)
- **Funcionalidades**:
  - Busca repositórios do GitHub via API (owner/repos)
  - Filtra forks e repositórios arquivados
  - Verifica duplicatas por `github_repo`
  - Preenche automaticamente: title, description, repoUrl, siteUrl, status, tags, languages, stars, githubUpdatedAt
  - Retorna JSON com projetos criados e ignorados

- **Arquivos criados**:
  - `api/src/main/java/dev/codesfb/api/controller/AdminController.java`
  - `api/src/main/java/dev/codesfb/api/service/GithubImportService.java`
  - `api/src/main/java/dev/codesfb/api/dto/ImportResult.java`

- **Arquivos modificados**:
  - `api/src/main/java/dev/codesfb/api/client/GithubClient.java` (adicionado `fetchUserRepos()`)
  - `api/src/main/java/dev/codesfb/api/client/GithubRepoResponse.java` (campos extras)
  - `api/src/main/java/dev/codesfb/api/repository/ProjectRepository.java` (adicionado `existsByGithubRepo()`)
  - `api/src/main/java/dev/codesfb/api/dto/ProjectDto.java` (adicionado método `fromEntity()`)
  - `api/src/main/java/dev/codesfb/api/dto/MediaDto.java` (adicionado método `fromEntity()`)

- **Teste realizado**: 4 repositórios importados com sucesso (fbw, dev-tools, algorithms-v, prw3-veiculos)
- **Documentação**: Criado guia completo em `docs/guia-importacao.md`

### ✅ Remoção de Mocks do Frontend
- Removido fallback para `mockProjects` em `useProjects` hook
- Frontend agora utiliza **apenas dados reais** da API
- Estado inicial: array vazio `[]` em vez de mocks
- Removida propriedade `isFallback` do hook
- **Build bem-sucedido**: TypeScript compilado sem erros
- **Frontend testado**: Rodando em http://localhost:5174

### ✅ Estado Atual do Sistema
- **API**: Rodando em http://localhost:8080 (Docker container)
- **Frontend**: Rodando em http://localhost:5174 (Vite dev server)
- **Banco de dados**: PostgreSQL com 7 projetos (3 seeds + 4 importados)
- **Endpoints disponíveis**:
  - `GET /api/projects` - Lista todos os projetos
  - `GET /api/projects/{id}` - Detalhes de um projeto
  - `GET /health` - Health check
  - `POST /api/admin/import?limit=N` - Importação do GitHub (protegido)

### 🎯 Próximos Passos Recomendados
1. **Interface administrativa** (quando login implementado):
   - Página `/admin/projects` para gerenciar projetos
   - Botão "Importar do GitHub" com seleção de quantidade
   - Editor visual para ajustar metadados após importação
   - Upload de mídia (screenshots, vídeos)

2. **Seleção manual de repositórios**:
   - Endpoint `GET /api/admin/preview-repos` para listar repos disponíveis
   - Endpoint `POST /api/admin/import-selected` para importar repos específicos
   - Interface com checkboxes para escolher quais importar

3. **Melhorias de segurança**:
   - Configurar `GITHUB_TOKEN` em produção (5000 req/h vs 60 req/h)
   - Alterar credenciais admin padrão via variáveis de ambiente
   - Implementar sistema de autenticação JWT para substituir Basic Auth

4. **Features adicionais**:
   - Filtros na página de projetos (por linguagem, tags, status)
   - Busca/pesquisa de projetos
   - Paginação (quando houver muitos projetos)
   - Sistema de cache para reduzir chamadas à API do GitHub

---

## Histórico Anterior

### ✅ Problema de Mapeamento PostgreSQL Array Resolvido (2026-11-04)
- **Problema**: Hibernate 7.4.5 não mapeava `List<String>` para PostgreSQL `TEXT[]`
- **Solução**: Alterado tipo interno do campo `tags` de `List<String>` para `String[]`
- **Manutenção de compatibilidade**: Getters/setters continuam retornando/recebendo `List<String>`
- **Status**: API Spring Boot inicializa sem erros, Flyway aplica migrações, DevDataSeeder popula 3 projetos

### ✅ Configuração Inicial
- Monorepo estruturado: `web/` (React + Vite) e `api/` (Spring Boot + PostgreSQL)
- Docker Compose configurado para desenvolvimento
- Flyway para migrações de schema
- DevDataSeeder para dados de teste nos perfis `dev` e `local`
- Sincronização automática com GitHub a cada 1 hora (configurável)

### 📝 Decisões Arquiteturais Documentadas
- Ver `docs/decisions.md` para decisões de design e arquitetura
- Ver `docs/api-contract.md` para especificação da API REST
- Ver `docs/guia-importacao.md` para guia de uso do endpoint de importação
