# MASTER DE PROMPTS PARA TRAE IDE - EduTracker v2.0

## ⚠️ INSTRUÇÕES CRÍTICAS

1. **Execute os prompts na ordem exata** (Fase 1 → Fase 2 → Fase 3 → Fase 4)
2. **Após cada prompt**, valide o resultado antes de passar ao próximo
3. **Consulte os documentos de referência** quando necessário:
   - `01_banco_dados.dbml` - Estrutura do banco
   - `02_PRD.md` - Requisitos funcionais
   - `03_schema_drizzle_prompts.md` - Schema TypeScript
   - `04_api_endpoints_prompts.md` - Endpoints
   - `05_regras_desenvolvimento_trae.md` - Padrões de código
   - `06_regras_design_system_trae.md` - Componentes visuais

4. **Stack confirmada:**
   - Next.js v14 (App Router)
   - TypeScript
   - Tailwind CSS v3
   - ShadCN UI
   - DrizzleORM
   - Supabase
   - Zod (validação)

---

## FASE 1: CONFIGURAÇÃO E SETUP

### PROMPT 1.1: Estrutura de Pastas e Arquivos Base

**Descrição:** Criar a estrutura completa de pastas e arquivos iniciais

**Instrução:**

Crie a estrutura de diretórios completa para a aplicação EduTracker em Next.js v14. Use a estrutura descrita em `05_regras_desenvolvimento_trae.md` seção 1.2.

Estrutura esperada:
```
src/
├── app/
│   ├── api/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── layout.tsx
├── components/
├── db/
├── lib/
├── hooks/
├── types/
├── config/
└── styles/
```

Crie apenas as pastas (não gere arquivos iniciais ainda). Mantenha a estrutura limpa e bem organizada.

---

### PROMPT 1.2: Configuração de Ambiente e Constantes

**Descrição:** Setup de variáveis de ambiente e constantes globais

**Instrução:**

Crie os seguintes arquivos:

1. **`.env.local`** - Variáveis de ambiente locais
   - NEXT_PUBLIC_API_URL
   - SUPABASE_URL
   - SUPABASE_ANON_KEY

2. **`src/config/constants.ts`** - Constantes globais
   - MAX_FILE_SIZE (10MB para avatar)
   - DEFAULT_TIMEZONE ('GMT-3')
   - TTL_VERIFICATION_TOKEN (24 horas)
   - TTL_RESET_TOKEN (24 horas)
   - MAX_NAME_LENGTH (120 para áreas/plataformas, 300 para cursos/aulas)
   - PASSWORD_MIN_LENGTH (8)

3. **`tailwind.config.ts`** - Customização Tailwind com cores do tokens.json
   - Estender tema com cores: bg-main, bg-accent, text-primary, accent, etc
   - Incluir todas as 10 cores de pickers
   - Configurar dark mode: 'class'

4. **`src/styles/globals.css`** - CSS Variables globais
   - Definir variáveis CSS para tema Dark
   - Preparar para tema Light

Não gere código React ainda, apenas configuração.

---

### PROMPT 1.3: Types e Interfaces Globais

**Descrição:** Criar arquivo de tipos TypeScript base

**Instrução:**

Crie `src/types/index.ts` com os seguintes tipos (baseado em 01_banco_dados.dbml):

**Auth Types:**
- `User`
- `EmailVerificationToken`
- `PasswordResetToken`
- `AuthProvider` (union: 'email' | 'google')
- `UserPlan` (union: 'free' | 'pro' | 'enterprise')

**Educational Types:**
- `Area`
- `Platform`
- `Course`
- `Lesson`
- `ActivityLog`
- `ActivityType` (union: 'lesson_completed' | 'course_added')
- `EntityType` (union: 'lesson' | 'course')

**Computed Types:**
- `AreaWithProgress`
- `CourseWithStats`
- `LessonComplete`
- `UserWithoutPassword`
- `DashboardMetrics`

**API Response Types:**
- `ApiResponse<T>`
- `PaginatedResponse<T>`

Use interfaces para objetos e tipos para unions. Adicione comentários JSDoc.

---

## FASE 2: SCHEMA E BANCO DE DADOS

### PROMPT 2.1: Drizzle Schema - Autenticação

**Descrição:** Gerar schema Drizzle para tabelas de autenticação

**Instrução:**

Crie `src/db/schema.ts` com as tabelas de autenticação (PROMPT 01 de `03_schema_drizzle_prompts.md`):

1. **Tabela `users`** - com todas as colunas especificadas
2. **Tabela `email_verification_tokens`**
3. **Tabela `password_reset_tokens`**

Incluir:
- Foreign keys corretos
- Índices otimizados
- Valores padrão com `sql`
- Comentários JSDoc
- Export de tipos: `User`, `EmailVerificationToken`, `PasswordResetToken`

Não incluir as tabelas educacionais ainda.

---

### PROMPT 2.2: Drizzle Schema - Estrutura Educacional

**Descrição:** Estender schema com tabelas educacionais

**Instrução:**

Estenda `src/db/schema.ts` com as tabelas educacionais (PROMPT 02 de `03_schema_drizzle_prompts.md`):

1. **Tabela `areas`**
2. **Tabela `platforms`**
3. **Tabela `courses`**
4. **Tabela `lessons`**

Incluir:
- Foreign keys com referências corretas
- Índices compostos para performance
- Comentários sobre position para drag-n-drop
- Export de tipos

---

### PROMPT 2.3: Drizzle Schema - Activity Log e Exports

**Descrição:** Finalizar schema com activity log e exports consolidados

**Instrução:**

Finalize `src/db/schema.ts` com:

1. **Tabela `activity_log`** (PROMPT 03 de `03_schema_drizzle_prompts.md`)
2. **Enums Globais** (PROMPT 05 de `03_schema_drizzle_prompts.md`):
   - AUTH_PROVIDER
   - USER_PLAN
   - ACTIVITY_TYPE
   - ENTITY_TYPE

3. **Tipos Customizados e Insert Types** (PROMPT 04 de `03_schema_drizzle_prompts.md`):
   - Insert types para todas as tabelas
   - Tipos customizados: AreaWithProgress, CourseWithStats, etc

4. **Export consolidado:**
   ```typescript
   export const schema = {
     auth: { users, emailVerificationTokens, passwordResetTokens },
     educational: { areas, platforms, courses, lessons },
     activity: { activityLog }
   }
   ```

---

### PROMPT 2.4: Database Connection e Utilities

**Descrição:** Criar funções para conexão e queries do banco

**Instrução:**

Crie `src/lib/db.ts` com:

1. **Configuração de conexão Drizzle**
   - Conectar com Supabase PostgreSQL
   - Usar variáveis de ambiente
   - Exportar instância do db

2. **Funções de query comuns:**
   - `getUserById(userId: string)`
   - `getUserByEmail(email: string)`
   - `updateUserLastLogin(userId: string)`

3. **Padrão de segurança:**
   - SEMPRE incluir user_id em queries (multi-tenancy)
   - Usar prepared statements (DrizzleORM faz isso automaticamente)

Não gere todas as queries ainda, apenas as essenciais de setup.

---

## FASE 3: AUTENTICAÇÃO E VALIDAÇÃO

### PROMPT 3.1: Schemas de Validação com Zod

**Descrição:** Criar todos os schemas de validação

**Instrução:**

Crie `src/lib/validation.ts` com todos os schemas (baseado em `04_api_endpoints_prompts.md`):

**Schemas Base:**
- `emailSchema`
- `passwordSchema`
- `nameSchema`

**Schemas de Auth:**
- `registerSchema`
- `loginSchema`
- `verifyEmailSchema`
- `resendVerificationSchema`
- `forgotPasswordSchema`
- `resetPasswordSchema`

**Schemas de Recursos:**
- `areaSchema`
- `platformSchema`
- `courseSchema`
- `lessonSchema` (único e múltiplo)
- `updateUserSchema`
- `changePasswordSchema`

**Tipos Inferidos:**
- Exportar types com `z.infer<typeof schema>`

Use refine() para validações customizadas (ex: password_confirm).

---

### PROMPT 3.2: Auth Utilities e Helpers

**Descrição:** Funções auxiliares de autenticação

**Instrução:**

Crie `src/lib/auth.ts` com:

1. **Supabase Client Setup**
   - Criar cliente Supabase server-side (para Server Components)
   - Criar cliente Supabase client-side (para Client Components)

2. **Funções de Auth:**
   - `getSession()` - Extrair sessão atual
   - `getCurrentUser()` - Buscar usuário autenticado
   - `getUserIdFromSession(session)` - Extrair user_id

3. **Hash/Compare Password:**
   - Usar bcrypt (Supabase nativo)
   - `hashPassword(password: string)`
   - `comparePassword(password: string, hash: string)`

4. **Token Generation:**
   - `generateToken()` - Gerar token aleatório
   - `generateExpirationDate(hours: number)` - Data de expiração

Manter tudo com tipos TypeScript corretos.

---

### PROMPT 3.3: API Response e Error Utilities

**Descrição:** Funções para padronizar respostas e erros

**Instrução:**

Crie `src/lib/api.ts` com:

1. **Response Helpers:**
   - `successResponse<T>(data: T, message?: string)`
   - `errorResponse(error: string, code?: string)`

2. **Fetch Utilities** (para client-side):
   - `apiGet<T>(endpoint: string, options?: RequestInit)`
   - `apiPost<T, D>(endpoint: string, body: D, options?: RequestInit)`
   - `apiPut<T, D>(endpoint: string, body: D, options?: RequestInit)`
   - `apiDelete(endpoint: string, options?: RequestInit)`

3. **Error Handling:**
   - Fazer parse de erros Zod
   - Converter em ApiResponse padrão
   - Log de erros em desenvolvimento

Padrão de resposta: `{ success: boolean, data?: T, error?: string }`

---

## FASE 4: ENDPOINTS DE API

### PROMPT 4.1: Endpoints de Autenticação

**Descrição:** Implementar endpoints de auth (login, register, verify, reset)

**Instrução:**

Crie os seguintes arquivos em `src/app/api/auth/`:

1. **`route.ts`** com handlers para:
   - POST `/api/auth/register` - Cadastro (baseado PROMPT 01 de `04_api_endpoints_prompts.md`)
   - POST `/api/auth/login` - Login
   - POST `/api/auth/verify-email` - Verificar email
   - POST `/api/auth/resend-verification` - Reenviar verificação
   - POST `/api/auth/forgot-password` - Solicitar reset
   - POST `/api/auth/reset-password` - Resetar senha
   - POST `/api/auth/logout` - Logout

Incluir:
- Validação com Zod
- Tratamento de erros apropriado
- Status codes corretos (400, 401, 404, 500)
- Envio de emails (usar Supabase Auth nativo)
- Retorno em padrão: `{ success, data?, error? }`

**Segurança:**
- Hash de password com bcrypt
- Tokens com TTL
- Verificação de email antes de permitir login

---

### PROMPT 4.2: Endpoints de Áreas

**Descrição:** CRUD completo para áreas

**Instrução:**

Crie endpoints em `src/app/api/areas/`:

1. **`route.ts`** com handlers:
   - GET `/api/areas` - Listar áreas do usuário
   - POST `/api/areas` - Criar área
   - PUT `/api/areas/reorder` - Reordenar (drag-n-drop)

2. **`[id]/route.ts`** com handlers:
   - PUT `/api/areas/[id]` - Atualizar área
   - DELETE `/api/areas/[id]` - Deletar área

**Para cada endpoint:**
- Validar autenticação (extrair user_id)
- Validar ownership (user_id do recurso)
- Validar com Zod schema
- Atualizar timestamps
- Retornar status apropriado

**Cascade delete (DELETE):**
- Deletar courses relacionados
- Deletar lessons relacionadas
- Deletar activity_log relacionado

(Baseado PROMPT 02 de `04_api_endpoints_prompts.md`)

---

### PROMPT 4.3: Endpoints de Plataformas

**Descrição:** CRUD para plataformas (idêntico a áreas)

**Instrução:**

Crie endpoints em `src/app/api/platforms/` seguindo mesmo padrão de áreas:

- GET, POST, PUT, DELETE para plataformas
- PUT para reorder

**Diferença importante:**
- DELETE deve validar se há courses associados
- Se sim: retornar 400 "Plataforma possui cursos associados"
- Deletar apenas se vazio

(Baseado PROMPT 03 de `04_api_endpoints_prompts.md`)

---

### PROMPT 4.4: Endpoints de Cursos

**Descrição:** CRUD para cursos

**Instrução:**

Crie endpoints em `src/app/api/courses/`:

1. **`route.ts`:**
   - GET `/api/courses` - Listar (com filtro area_id opcional)
   - POST `/api/courses` - Criar

2. **`[id]/route.ts`:**
   - GET `/api/courses/[id]` - Buscar com lessons
   - PUT `/api/courses/[id]` - Atualizar
   - DELETE `/api/courses/[id]` - Deletar (cascade lessons)

3. **`reorder`:**
   - PUT `/api/courses/reorder` - Reordenar cursos

**Específico de cursos:**
- Verificar ownership de area_id e platform_id
- Validar que area e platform pertencem ao usuário
- Log activity: "course_added" ao criar

(Baseado PROMPT 04 de `04_api_endpoints_prompts.md`)

---

### PROMPT 4.5: Endpoints de Aulas

**Descrição:** CRUD para aulas (com suporte a modo único e múltiplo)

**Instrução:**

Crie endpoints em `src/app/api/lessons/`:

1. **`route.ts`:**
   - GET `/api/lessons` - Listar aulas (query param: course_id)
   - POST `/api/lessons` - Criar (suportar modo único e múltiplo)

2. **`[id]/route.ts`:**
   - PUT `/api/lessons/[id]` - Atualizar (incluindo toggle completed)
   - DELETE `/api/lessons/[id]` - Deletar

3. **`reorder`:**
   - PUT `/api/lessons/reorder` - Reordenar aulas

**Específico de aulas:**
- Modo múltiplo: parse "um nome por linha"
- Incrementar position automaticamente
- Atualizar courses.total_lessons ao criar/deletar
- Atualizar courses.completed_lessons ao marcar concluída
- Log activity: "lesson_completed" quando marked as done

(Baseado PROMPT 05 de `04_api_endpoints_prompts.md`)

---

### PROMPT 4.6: Endpoints de Usuário

**Descrição:** Endpoints para gerenciar perfil

**Instrução:**

Crie endpoints em `src/app/api/user/`:

1. **GET `/api/user`**
   - Retornar dados do usuário autenticado
   - SEM password_hash

2. **PUT `/api/user`**
   - Atualizar: first_name, last_name, bio, timezone, avatar_url
   - Validar tamanho de bio (max 500)

3. **POST `/api/user/change-password`**
   - Validar senha atual
   - Atualizar para nova senha
   - Validar regras (8+ chars, letras + números)

4. **POST `/api/user/upload-avatar`**
   - Receber FormData com file
   - Validar tipo (image/*)
   - Validar tamanho (máx 10MB)
   - Upload para Supabase Storage
   - Retornar URL pública
   - Atualizar users.avatar_url

(Baseado PROMPT 06 de `04_api_endpoints_prompts.md`)

---

## FASE 5: COMPONENTES FRONTEND

### PROMPT 5.1: Componentes Comuns (ShadCN Base)

**Descrição:** Setup inicial de componentes ShadCN

**Instrução:**

Execute os seguintes comandos para instalar componentes ShadCN base:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add progress
```

Estes componentes já vêm com suporte a Tailwind e dark mode.

---

### PROMPT 5.2: Layout Components - Sidebar e Header

**Descrição:** Componentes fixos de layout

**Instrução:**

Crie em `src/components/layout/`:

1. **`Sidebar.tsx`**
   - Baseado em `06_regras_design_system_trae.md` seção 8.1
   - Menu dinâmico baseado na área (Dashboard/Console/Usuário)
   - Item ativo com destaque
   - Footer com info de plano
   - Uso de Lucide icons

2. **`Header.tsx`**
   - Baseado em `06_regras_design_system_trae.md` seção 8.2
   - Título e subtítulo dinâmicos
   - Avatar com dropdown (Perfil, Logout)
   - Theme toggle (futuro)

3. **`NavMenu.tsx`**
   - Componente que renderiza menu baseado em contexto

Usar tokens de cor do Tailwind config.

---

### PROMPT 5.3: Forms de Autenticação

**Descrição:** Formulários para login, registro, etc

**Instrução:**

Crie em `src/components/auth/`:

1. **`LoginForm.tsx`**
   - Email + Senha
   - React Hook Form + Zod
   - Botão "Entrar" + "Continuar com Google"
   - Link "Esqueceu senha?" e "Registre-se"

2. **`RegisterForm.tsx`**
   - Nome completo + Email + Senha + Confirmar Senha
   - Validação em tempo real
   - Botão "Entrar"
   - Link "Faça login"

3. **`VerifyEmailForm.tsx`**
   - Mostrar email de confirmação
   - Botão "Reenviar e-mail"
   - Link "Usar outro e-mail"

4. **`ForgotPasswordForm.tsx`**
   - Campo email
   - Botão "Enviar link de recuperação"
   - Link "Voltar ao login"

Baseado em `05_regras_desenvolvimento_trae.md` seção 3.3 (React Hook Form pattern).

---

### PROMPT 5.4: Dashboard Components

**Descrição:** Componentes para dashboard de estudos

**Instrução:**

Crie em `src/components/dashboard/`:

1. **`MetricsCard.tsx`**
   - Baseado em `06_regras_design_system_trae.md` seção 7.1
   - Exibir label, valor e ícone
   - Props: label, value, icon, iconBgColor

2. **`ProgressChart.tsx`**
   - Gráfico donut com Tremor
   - Baseado em `06_regras_design_system_trae.md` seção 7.3
   - Exibir progresso por área
   - Mostrar percentual total

3. **`ActivityList.tsx`**
   - Lista de atividades recentes (últimas 5)
   - Baseado em `06_regras_design_system_trae.md` seção 7.5
   - Ícones diferentes por tipo
   - Timestamp relativo

4. **`CoursesList.tsx`**
   - Listar últimos 3 cursos atualizados
   - Badge de plataforma
   - Progress bar
   - Ultimas 5 aulas do curso

5. **`AreaCard.tsx`**
   - Card de área com borda colorida
   - Baseado em `06_regras_design_system_trae.md` seção 7.2
   - Clicável
   - Exibir estatísticas

---

### PROMPT 5.5: Console Components - Forms

**Descrição:** Formulários para Console (criar/editar áreas, cursos, aulas)

**Instrução:**

Crie em `src/components/console/`:

1. **`AreaForm.tsx`**
   - Input para nome
   - Seletor de cor (color picker com 10 cores)
   - Botões Adicionar/Cancelar

2. **`PlatformForm.tsx`**
   - Mesma estrutura que AreaForm

3. **`CourseForm.tsx`**
   - Input para nome
   - Select para Área
   - Select para Plataforma
   - Botões Adicionar/Cancelar

4. **`LessonForm.tsx`**
   - Input para nome da aula (único)
   - OU Textarea para nomes múltiplos
   - Checkbox "Modo múltiplas aulas"
   - Input para ordem inicial
   - Botões Adicionar/Cancelar

Todos com React Hook Form + Zod.

---

### PROMPT 5.6: Console Components - Lists com Drag-n-Drop

**Descrição:** Listas arrastáveis para reordenação

**Instrução:**

Crie em `src/components/console/`:

1. **`DraggableAreaList.tsx`**
   - Usar @dnd-kit
   - Mostrar drag handle (::)
   - Exibir badge com cor
   - Ícones edit/delete
   - Baseado em `06_regras_design_system_trae.md` seção 7.4

2. **`DraggablePlatformList.tsx`**
   - Mesma estrutura

3. **`DraggableCourseList.tsx`**
   - Lista de cursos por área (tabs)
   - Drag handle
   - Badge plataforma
   - Ícones edit/delete

4. **`DraggableLessonList.tsx`**
   - Lista de aulas por curso
   - Checkbox para completed
   - Drag handle
   - Ícones edit/delete
   - Mudar color ao completar

---

### PROMPT 5.7: User Profile Components

**Descrição:** Componentes para área de usuário

**Instrução:**

Crie em `src/components/user/`:

1. **`ProfileForm.tsx`**
   - Seção: Informações Básicas (read-only)
   - Seção: Dados Pessoais (editável)
     - Nome, Sobrenome, Bio, Timezone
   - Botões: Salvar, Cancelar

2. **`ChangePasswordForm.tsx`**
   - Senha atual
   - Nova senha
   - Confirmar senha
   - Botão "Alterar senha"

3. **`AvatarUpload.tsx`**
   - Imagem circular com overlay
   - Ícone de câmera
   - Click para upload
   - Validar tipo e tamanho
   - Fazer upload para Supabase Storage

4. **`SubscriptionModal.tsx`**
   - Modal placeholder
   - Ícone de calendário
   - Texto: "Em breve!"

---

## FASE 6: HOOKS E LÓGICA

### PROMPT 6.1: Hooks de Autenticação

**Descrição:** Custom hooks para auth

**Instrução:**

Crie em `src/hooks/`:

1. **`useAuth.ts`**
   - Estado: user, isLoading, error
   - Funções: login, register, logout, checkAuth
   - Usar Context ou localStorage para persistência
   - Baseado em `05_regras_desenvolvimento_trae.md` seção 3.2

2. **`useUser.ts`**
   - Buscar dados do usuário
   - Atualizar perfil
   - Mudar senha
   - Upload avatar

---

### PROMPT 6.2: Hooks de Recursos Educacionais

**Descrição:** Hooks para áreas, plataformas, cursos, aulas

**Instrução:**

Crie em `src/hooks/`:

1. **`useAreas.ts`**
   - GET áreas
   - POST criar área
   - PUT atualizar
   - DELETE deletar
   - PUT reorder

2. **`usePlatforms.ts`**
   - Mesma estrutura

3. **`useCourses.ts`**
   - GET cursos (com filtro area_id)
   - POST criar
   - PUT atualizar
   - DELETE deletar
   - PUT reorder

4. **`useLessons.ts`**
   - GET lições (com course_id)
   - POST criar (modo único e múltiplo)
   - PUT atualizar (incluindo toggle completed)
   - DELETE deletar
   - PUT reorder

Todos com loading, error, e retry logic.

---

### PROMPT 6.3: Hooks de Dashboard

**Descrição:** Hooks para calcular métricas

**Instrução:**

Crie em `src/hooks/`:

1. **`useDashboardMetrics.ts`**
   - Calcular: totalAulas, aulasC concluídas, totalCursos, cursosConcluídos
   - Baseado em `02_PRD.md` seção 4.1

2. **`useDashboardProgress.ts`**
   - Calcular: progressoGeral (média de áreas)
   - Calcular: progresso por área
   - Retornar dados para gráfico donut

3. **`useRecentActivities.ts`**
   - Buscar últimas 5 atividades
   - Formatar com timestamp relativo

4. **`useRecentCourses.ts`**
   - Buscar últimos 3 cursos atualizados
   - Com lessons relacionadas

---

## FASE 7: PÁGINAS E ROTAS

### PROMPT 7.1: Páginas de Autenticação

**Descrição:** Criar páginas públicas (sem autenticação)

**Instrução:**

Crie em `src/app/(auth)/`:

1. **`layout.tsx`**
   - Layout específico para auth
   - Sem sidebar
   - Centralizado
   - Fundo dark

2. **`login/page.tsx`**
   - Usar LoginForm
   - Título "Faça login em sua conta"
   - Subtítulo "Acompanhe seu progresso e estatísticas de aprendizado"

3. **`register/page.tsx`**
   - Usar RegisterForm
   - Título "Cire sua conta gratuita"
   - Subtítulo "Comece a rastrear seu aprendizado"

4. **`verify-email/page.tsx`**
   - Usar VerifyEmailForm
   - Aparecer após register

5. **`forgot-password/page.tsx`**
   - Usar ForgotPasswordForm
   - Acessível de login

---

### PROMPT 7.2: Páginas do Dashboard - Estudos

**Descrição:** Página principal de dashboard

**Instrução:**

Crie em `src/app/(dashboard)/dashboard/estudos/`:

1. **`page.tsx`**
   - Usar layout do dashboard
   - Usar Header com título "Dashboard de Estudos"
   - Renderizar 4 MetricsCards
   - Renderizar ProgressChart
   - Renderizar ActivityList
   - Renderizar CoursesList (últimos 3)

**Layout esperado:**
- Grid 4 colunas para cards
- 2 colunas: gráfico + atividades
- Full width: últimos cursos

---

### PROMPT 7.3: Página do Dashboard - Áreas e Cursos

**Descrição:** Página de relatórios por área

**Instrução:**

Crie em `src/app/(dashboard)/dashboard/areas-cursos/`:

1. **`page.tsx`**
   - Header com título "Dashboard - Áreas de Estudos e Cursos"
   - Grid 3 colunas de AreaCards (dinamicamente)
   - Métricas consolidadas abaixo (4 cards)
   - Últimos 3 cursos atualizados abaixo

---

### PROMPT 7.4: Páginas do Console

**Descrição:** Páginas CRUD

**Instrução:**

Crie em `src/app/(dashboard)/console/`:

1. **`areas-plataformas/page.tsx`**
   - Duas colunas: Áreas e Plataformas
   - Form no topo de cada
   - DraggableList abaixo
   - Baseado em design do `01_-_console_-_areas_e_plataformas.jpg`

2. **`cursos-projetos/page.tsx`**
   - Tabs por área
   - Botão "+ Curso | Projeto"
   - DraggableCourseList
   - Modal para criar/editar

3. **`aulas/page.tsx`**
   - Tabs por área (seleção)
   - Listar cursos da área
   - Click em curso → gerenciar aulas
   - Modal para adicionar aulas (único/múltiplo)
   - DraggableLessonList

---

### PROMPT 7.5: Páginas de Usuário

**Descrição:** Páginas de perfil e configurações

**Instrução:**

Crie em `src/app/(dashboard)/usuario/`:

1. **`meu-perfil/page.tsx`**
   - Header com título "Meu Perfil"
   - AvatarUpload (circular no topo)
   - ProfileForm
   - ChangePasswordForm

2. **`minha-assinatura/page.tsx`**
   - Mostrar SubscriptionModal
   - Placeholder "Em breve!"

---

## FASE 8: MIDDLEWARE E AUTENTICAÇÃO

### PROMPT 8.1: Route Protection Middleware

**Descrição:** Proteger rotas autenticadas

**Instrução:**

Crie `src/middleware.ts` para:

1. Verificar se rota requer autenticação
2. Se não autenticado e tenta acessar `/dashboard/*` → redirecionar para `/login`
3. Se autenticado e tenta acessar `/login` → redirecionar para `/dashboard`
4. Usar Supabase Auth para verificar sessão

Baseado em `05_regras_desenvolvimento_trae.md` seção 9.1

---

### PROMPT 8.2: Auth Context Provider

**Descrição:** Contexto global de autenticação

**Instrução:**

Crie `src/context/AuthContext.tsx`:

1. Context com: user, isLoading, login, logout
2. Provider que verifica autenticação ao montar
3. Envolver todo app no layout
4. Baseado em `05_regras_desenvolvimento_trae.md` seção 6

---

## FASE 9: UTILITÁRIOS E HELPERS

### PROMPT 9.1: Progress Calculation Utilities

**Descrição:** Funções para calcular progresso

**Instrução:**

Crie `src/lib/calculations.ts`:

1. **`calculateCourseProgress(course: Course)`**
   - (completed_lessons / total_lessons) * 100

2. **`calculateAreaProgress(courses: Course[])`**
   - Média de progresso dos cursos

3. **`calculateTotalProgress(areas: AreaWithCourses[])`**
   - Média de progresso das áreas

(Baseado em `06_regras_design_system_trae.md` seção 15.2)

---

### PROMPT 9.2: Formatting Utilities

**Descrição:** Helpers para formatação

**Instrução:**

Crie `src/lib/utils.ts`:

1. **`getRelativeTime(date: Date): string`**
   - "há 2h", "há 1d", etc

2. **`formatDate(date: Date): string`**
   - Formatação padrão

3. **`getColorByPickerIndex(index: number): string`**
   - Retornar cor do picker baseado no index

4. **`cn(...classes: string[])`**
   - Merge de classes Tailwind

---

## CHECKPOINTS DE VALIDAÇÃO

### Checkpoint 1: Setup Completo
- [ ] Estrutura de pastas criada
- [ ] Variáveis de ambiente configuradas
- [ ] Tailwind com cores customizadas
- [ ] TypeScript rodando sem erros

### Checkpoint 2: Banco de Dados
- [ ] Schema Drizzle completo
- [ ] Conexão com Supabase funcionando
- [ ] Migrations executadas
- [ ] RLS policies configuradas

### Checkpoint 3: APIs Funcionais
- [ ] Endpoints de auth testados
- [ ] Endpoints de recursos (CRUD) testados
- [ ] Validação Zod funcionando
- [ ] Responses padrão corretas

### Checkpoint 4: Frontend Básico
- [ ] Páginas de auth renderizando
- [ ] Login/Register funcionando
- [ ] Dashboard renderizando com dados
- [ ] Layout (sidebar, header) correto

### Checkpoint 5: Console
- [ ] Criar áreas/plataformas
- [ ] Criar cursos
- [ ] Criar aulas (modo único e múltiplo)
- [ ] Drag-n-drop funcionando

### Checkpoint 6: Completo
- [ ] Todos os endpoints testados
- [ ] Todas as páginas renderizando
- [ ] Drag-n-drop com salvamento automático
- [ ] Progresso calculado corretamente

---

## RESUMO VISUAL DO FLUXO

```
FASE 1: Setup
├─ Estrutura pastas
├─ Variáveis ambiente
├─ Tailwind config
└─ Types globais

FASE 2: Banco de Dados
├─ Schema Auth
├─ Schema Educacional
├─ Activity Log
└─ Conexão DB

FASE 3: Validação e Auth
├─ Zod Schemas
├─ Auth Utilities
├─ API Response Helpers
└─ Error Handling

FASE 4: Endpoints API
├─ Auth endpoints
├─ Áreas endpoints
├─ Plataformas endpoints
├─ Cursos endpoints
├─ Aulas endpoints
└─ User endpoints

FASE 5: Componentes
├─ Layout (Sidebar, Header)
├─ Auth Forms
├─ Dashboard Components
├─ Console Forms
├─ Console Lists (Drag-n-drop)
└─ User Components

FASE 6: Hooks
├─ useAuth
├─ useAreas, usePlatforms, useCourses, useLessons
├─ useUser
└─ Dashboard hooks

FASE 7: Páginas
├─ Auth pages (login, register, verify, forgot)
├─ Dashboard pages (estudos, áreas-cursos)
├─ Console pages (áreas, cursos, aulas)
└─ User pages (perfil, assinatura)

FASE 8: Middleware
├─ Route Protection
└─ Auth Context

FASE 9: Utilitários
├─ Progress Calculations
└─ Formatting Helpers
```

---

## 🚀 ORDEM RECOMENDADA DE EXECUÇÃO

1. **Comece pela FASE 1 e 2** - Foundation
2. **Depois FASE 3 e 4** - Backend
3. **Depois FASE 5** - Components (comece pelos comuns)
4. **Depois FASE 6** - Hooks
5. **Depois FASE 7** - Pages
6. **Depois FASE 8 e 9** - Polish

**Não pule fases!** Cada fase depende da anterior.

---

## ⚠️ ADVERTÊNCIAS IMPORTANTES

1. **SEMPRE validar ownership** - Verificar user_id antes de qualquer operação
2. **SEMPRE incluir timestamps** - created_at, updated_at em tudo
3. **SEMPRE fazer cascade delete** - Deletar relacionados
4. **NUNCA esquecer validação** - Server-side e client-side
5. **SEMPRE usar tipos TypeScript** - Sem `any`
6. **SEMPRE testar drag-n-drop** - Com salvamento automático
7. **SEMPRE respeitar design system** - Usar tokens de cor

---

**Versão:** 1.0
**Data:** Outubro 2025
**Status:** Pronto para implementação
**Complexidade:** Alta
**Tempo Estimado:** 40-60 horas de desenvolvimento
