# Guia de Importação de Repositórios do GitHub

## Visão Geral

O endpoint `POST /api/admin/import` permite importar automaticamente seus repositórios públicos do GitHub para o banco de dados do portfólio.

## Autenticação

O endpoint é protegido por **HTTP Basic Auth**. Use as credenciais configuradas em `application.yml`:

- **Usuário**: `admin` (padrão, configurável via `ADMIN_USER`)
- **Senha**: `admin` (padrão, configurável via `ADMIN_PASSWORD`)

## Como Usar

### Importação via cURL

```bash
curl -X POST "http://localhost:8080/api/admin/import?limit=4" \
  -u admin:admin \
  -H "Content-Type: application/json"
```

### Parâmetros

- `limit` (opcional, padrão: `4`): Número máximo de repositórios a importar

### O que o endpoint faz

1. **Busca repositórios** via API do GitHub:
   - Endpoint: `GET https://api.github.com/users/codesfb/repos`
   - Parâmetros: `type=owner&sort=pushed&per_page=20`
   - Ordena por data de último push (mais recentes primeiro)

2. **Filtra automaticamente**:
   - Remove repositórios que são **forks**
   - Remove repositórios **arquivados**
   - Limita ao número especificado em `limit`

3. **Verifica duplicatas**:
   - Compara pelo campo `github_repo` (formato: `owner/repo`)
   - Ignora repositórios já existentes no banco

4. **Preenche dados automaticamente**:
   - `title`: Nome do repositório
   - `description`: Descrição do GitHub
   - `repoUrl`: URL do repositório (`html_url`)
   - `siteUrl`: Homepage (se configurada no GitHub)
   - `status`: Sempre `em-andamento`
   - `tags`: Topics do repositório
   - `languages`: Busca via API secundária `/repos/{owner}/{repo}/languages`
   - `stars`: Contador de estrelas
   - `githubUpdatedAt`: Data da última atualização

### Resposta

```json
{
  "created": [
    {
      "id": 4,
      "title": "fbw",
      "description": "This is my website, take a look",
      "repoUrl": "https://github.com/codesfb/fbw",
      "languages": ["JavaScript", "CSS", "HTML"],
      "updatedAt": "2026-09-23T19:23:18Z",
      "status": "em-andamento",
      "siteUrl": "https://fabio-website.vercel.app",
      "tags": [],
      "featured": false,
      "stars": 0
    }
  ],
  "ignored": [
    "codesfb/some-repo-already-exists"
  ],
  "total": 4
}
```

- `created`: Lista dos projetos criados com sucesso
- `ignored`: Lista de repositórios que já existiam (por `github_repo`)
- `total`: Soma de criados + ignorados

## Próximos Passos: Interface Web

Quando o sistema de login estiver implementado, você poderá adicionar uma interface administrativa no frontend para:

### 1. Página de Administração de Projetos

```
/admin/projects
```

**Recursos sugeridos**:
- Botão "Importar do GitHub"
- Formulário para escolher:
  - Número de repos a importar (slider ou input)
  - Filtros adicionais (linguagem, stars mínimas, etc.)
- Lista de projetos importados com opções de:
  - Editar metadados (título, descrição, status)
  - Marcar como destaque (`featured`)
  - Adicionar mídia (screenshots, vídeos)
  - Arquivar/remover

### 2. Fluxo de Importação Visual

```tsx
// Exemplo de componente React
function ImportRepositories() {
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);
  
  const handleImport = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/import?limit=${limit}`,
        {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa('admin:admin')
          }
        }
      );
      const result = await response.json();
      
      // Mostrar resultado ao usuário
      toast.success(`${result.created.length} projetos importados!`);
      
      if (result.ignored.length > 0) {
        toast.info(`${result.ignored.length} já existiam`);
      }
    } catch (error) {
      toast.error('Erro ao importar repositórios');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <label>
        Número de repositórios:
        <input 
          type="number" 
          value={limit} 
          onChange={(e) => setLimit(e.target.value)}
          min="1"
          max="20"
        />
      </label>
      <button onClick={handleImport} disabled={loading}>
        {loading ? 'Importando...' : 'Importar do GitHub'}
      </button>
    </div>
  );
}
```

### 3. Seleção Manual de Repositórios

Em vez de importar os N primeiros, você pode criar um endpoint adicional que:

1. Lista todos os repositórios disponíveis
2. Permite marcar quais importar
3. Permite pré-visualizar antes de confirmar

```typescript
// Endpoint sugerido: GET /api/admin/preview-repos
// Retorna lista de repos disponíveis para seleção manual

// Endpoint sugerido: POST /api/admin/import-selected
// Body: { "repos": ["codesfb/repo1", "codesfb/repo2"] }
```

## Segurança

### Configuração de Produção

**IMPORTANTE**: Em produção, altere as credenciais padrão:

```bash
# Variáveis de ambiente
export ADMIN_USER=seu_usuario
export ADMIN_PASSWORD=senha_forte_aqui
```

Ou no `application.yml`:

```yaml
app:
  admin:
    user: ${ADMIN_USER:admin}
    password: ${ADMIN_PASSWORD:admin}
```

### Rate Limiting do GitHub

- **Sem token**: 60 requisições/hora
- **Com token**: 5000 requisições/hora

Para evitar rate limit, configure um token pessoal:

```bash
export GITHUB_TOKEN=ghp_seu_token_aqui
```

O token precisa apenas da permissão `public_repo` (leitura de repositórios públicos).

## Manutenção Futura

### Sincronização Automática

O sistema já possui uma tarefa agendada que atualiza os dados do GitHub a cada hora. Veja em:
- `ProjectService.syncProjectsWithGithub()`
- Configurável via `app.github.sync-interval` (em milissegundos)

### Logs

Para acompanhar a importação:

```bash
sudo docker compose logs -f api | grep -i "import\|github"
```

## Troubleshooting

### Erro 401 (Unauthorized)

- Verifique as credenciais Basic Auth
- Confirme que está usando `admin:admin` ou as configuradas

### Repositórios não aparecem

- Verifique se não são forks ou arquivados
- Aumente o parâmetro `limit`
- Verifique se já existem no banco (`ignored` no retorno)

### Rate limit do GitHub

- Configure `GITHUB_TOKEN` para aumentar o limite
- Reduza a frequência de sincronização
- Use `limit` menor para reduzir chamadas à API

## Arquivos Criados/Modificados

### Novos Arquivos:
- `api/src/main/java/dev/codesfb/api/controller/AdminController.java`
- `api/src/main/java/dev/codesfb/api/service/GithubImportService.java`
- `api/src/main/java/dev/codesfb/api/dto/ImportResult.java`

### Modificados:
- `api/src/main/java/dev/codesfb/api/client/GithubClient.java` - adicionado `fetchUserRepos()`
- `api/src/main/java/dev/codesfb/api/client/GithubRepoResponse.java` - campos extras
- `api/src/main/java/dev/codesfb/api/repository/ProjectRepository.java` - `existsByGithubRepo()`
- `api/src/main/java/dev/codesfb/api/dto/ProjectDto.java` - método `fromEntity()`
- `api/src/main/java/dev/codesfb/api/dto/MediaDto.java` - método `fromEntity()`

## Testes

Endpoint testado e funcionando:
- ✅ Importa 4 repositórios do GitHub
- ✅ Filtra forks e arquivados
- ✅ Previne duplicatas
- ✅ Preenche todos os campos automaticamente
- ✅ Protegido por Basic Auth
- ✅ Retorna resultado estruturado com criados/ignorados
