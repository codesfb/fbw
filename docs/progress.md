# Progress Log

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
