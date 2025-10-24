# SETUP + PROMPTS DESENVOLVIMENTO - TUDO EM UM ARQUIVO

---

## PARTE 1: SETUP E INSTALAÇÃO

### Criar projeto Next.js v14

```bash
npx create-next-app@14 edutracker \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-git \
  --no-src-dir \
  --import-alias '@/*' \
  --skip-install
```

### Entrar na pasta

```bash
cd edutracker
```

### Instalar dependências base

```bash
npm install
```

### Instalar Supabase

```bash
npm install @supabase/supabase-js@2 @supabase/ssr
```

### Instalar DrizzleORM

```bash
npm install drizzle-orm@0 pg@8
npm install -D drizzle-kit
```

### Instalar Zod

```bash
npm install zod@3
```

### Instalar Tailwind utilities

```bash
npm install -D tailwindcss-animate@1
npm install clsx tailwind-merge class-variance-authority
```

### Instalar React Hook Form

```bash
npm install react-hook-form@7 @hookform/resolvers@3
```

### Instalar Radix UI

```bash
npm install @radix-ui/react-slot \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-dialog \
  @radix-ui/react-select \
  @radix-ui/react-tabs \
  @radix-ui/react-toast \
  @radix-ui/react-avatar
```

### Instalar ícones e gráficos

```bash
npm install lucide-react recharts
```

### Instalar Drag and Drop

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Instalar utilitários

```bash
npm install date-fns js-cookie dompurify sonner
npm install -D @types/dompurify @types/js-cookie
```

### Instalar ShadCN UI

```bash
npx shadcn-ui@latest init
componentes para instalar:
dropdown-menu
dialog
select
tabs
toast
avatar
```

Aceite defaults. Depois:

```bash
npx shadcn-ui@latest add button input card dialog select dropdown-menu avatar badge tabs toast skeleton progress label textarea separator form
```

### Criar .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_TIMEZONE=America/Recife
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/[database]?sslmode=require
```

### Criar estrutura de pastas

```bash
mkdir -p app/api/{auth,areas,areas/\[id\],platforms,platforms/\[id\],courses,courses/\[id\],lessons,lessons/\[id\],user}
mkdir -p app/\(auth\)/{login,register,verify-email,forgot-password}
mkdir -p app/\(dashboard\)/{dashboard/{estudos,areas-cursos},console/{areas-plataformas,cursos-projetos,aulas},usuario/{meu-perfil,minha-assinatura}}
mkdir -p components/{auth,dashboard,console,user,layout,common}
mkdir -p lib hooks types config db context styles
```

### Testar setup

```bash
npm run type-check
npm run build
npm run dev
```

Se tudo OK, parar com `Ctrl+C`.

---

## PARTE 2: PROMPTS PARA TRAE IDE

**Execute em ordem. Cada PROMPT depende do anterior.**

---

## FASE 1: SETUP

### PROMPT 1.1: Constantes globais

Crie `src/config/constants.ts` com constantes baseado em 02_PRD.md:

```
MAX_FILE_SIZE: 10485760 (10MB)
DEFAULT_TIMEZONE: 'America/Recife'
TTL_VERIFICATION_TOKEN: 24 * 60 * 60
TTL_RESET_TOKEN: 24 * 60 * 60
MAX_NAME_LENGTH_AREAS: 120
MAX_NAME_LENGTH_CURSOS: 300
PASSWORD_MIN_LENGTH: 8
```

### PROMPT 1.2: Types globais

Crie `src/types/index.ts` com types baseado em 01_banco_dados.dbml:

```
Auth Types: User, EmailVerificationToken, PasswordResetToken, AuthProvider, UserPlan
Educational: Area, Platform, Course, Lesson, ActivityLog, ActivityType, EntityType
Computed: AreaWithProgress, CourseWithStats, LessonComplete, UserWithoutPassword
API: ApiResponse<T>, PaginatedResponse<T>
```

---

## FASE 2: BANCO DE DADOS

### PROMPT 2.1: Schema autenticação

Crie `src/db/schema.ts` com tabelas:

- users (conforme 01_banco_dados.dbml)
- email_verification_tokens
- password_reset_tokens

Use DrizzleORM com tipos TypeScript corretos.

### PROMPT 2.2: Schema educacional

Estenda `src/db/schema.ts` com tabelas:

- areas
- platforms
- courses
- lessons

Incluir foreign keys, índices, position para drag-n-drop.

### PROMPT 2.3: Schema activity log

Finalize `src/db/schema.ts` com:

- activity_log
- Enums: AUTH_PROVIDER, USER_PLAN, ACTIVITY_TYPE, ENTITY_TYPE
- Insert types para todas as tabelas

### PROMPT 2.4: Conexão banco e helpers

Crie `src/lib/db.ts`:

- Conexão Drizzle com PostgreSQL Supabase
- getUserById(userId: string)
- getUserByEmail(email: string)
- updateUserLastLogin(userId: string)

**IMPORTANTE:** Sempre incluir user_id em queries (multi-tenancy).

---

## FASE 3: VALIDAÇÃO E AUTENTICAÇÃO

### PROMPT 3.1: Schemas Zod

Crie `src/lib/validation.ts` com Zod schemas conforme 04_api_endpoints_prompts.md:

```
Schemas base: emailSchema, passwordSchema, nameSchema
Auth: registerSchema, loginSchema, verifyEmailSchema, resendVerificationSchema, forgotPasswordSchema, resetPasswordSchema
Recursos: areaSchema, platformSchema, courseSchema, lessonSchema (único e múltiplo)
User: updateUserSchema, changePasswordSchema
Exportar types com z.infer<typeof schema>
```

### PROMPT 3.2: Auth utilities

Crie `src/lib/auth.ts`:

```
- Supabase client (server e client)
- getSession()
- getCurrentUser()
- getUserIdFromSession()
- hashPassword()
- comparePassword()
- generateToken()
- generateExpirationDate()
```

### PROMPT 3.3: API response helpers

Crie `src/lib/api.ts`:

```
- successResponse<T>(data: T, message?: string)
- errorResponse(error: string, code?: string)
- apiGet<T>(endpoint: string, options?: RequestInit)
- apiPost<T, D>(endpoint: string, body: D, options?: RequestInit)
- apiPut<T, D>(endpoint: string, body: D, options?: RequestInit)
- apiDelete(endpoint: string, options?: RequestInit)
```

---

## FASE 4: ENDPOINTS DE API

### PROMPT 4.1: Auth endpoints

Crie `src/app/api/auth/route.ts` com handlers:

```
POST /api/auth/register - Validar Zod, criar usuário, gerar token verificação, enviar email
POST /api/auth/login - Validar email/senha, verificar email_verified, criar sessão
POST /api/auth/verify-email - Validar token, marcar email como verificado
POST /api/auth/resend-verification - Reenviar email com novo token
POST /api/auth/forgot-password - Gerar token reset, enviar email
POST /api/auth/reset-password - Validar token, alterar senha
POST /api/auth/logout - Deletar sessão

Respostas: { success: boolean, data?: T, error?: string }
Status: 400 (validação/erro), 401 (não autenticado), 404 (não encontrado), 500 (erro servidor)
```

### PROMPT 4.2: Areas endpoints

Crie `src/app/api/areas/route.ts` e `src/app/api/areas/[id]/route.ts`:

```
GET /api/areas - Listar áreas do usuário, ordenadas por position
POST /api/areas - Criar nova área (validar ownership, incrementar position)
PUT /api/areas/[id] - Atualizar área (verificar ownership)
DELETE /api/areas/[id] - Deletar área com cascade (courses, lessons, activity_log)
PUT /api/areas/reorder - Reordenar múltiplas áreas (drag-n-drop)

Validações: Zod, ownership (user_id), timestamps (created_at, updated_at)
```

### PROMPT 4.3: Platforms endpoints

Crie `src/app/api/platforms/` (mesmo padrão de áreas):

```
GET, POST, PUT /[id], DELETE /[id], PUT /reorder

DIFERENÇA: DELETE deve verificar se há courses associados.
Se sim: retornar 400 "Plataforma possui cursos associados"
```

### PROMPT 4.4: Courses endpoints

Crie `src/app/api/courses/` com:

```
GET /api/courses - Listar (filtro area_id opcional)
POST /api/courses - Criar (validar ownership de area e platform, log activity)
GET /api/courses/[id] - Buscar com lessons relacionadas
PUT /api/courses/[id] - Atualizar
DELETE /api/courses/[id] - Deletar com cascade
PUT /api/courses/reorder - Reordenar
```

### PROMPT 4.5: Lessons endpoints

Crie `src/app/api/lessons/` com:

```
GET /api/lessons - Query param: course_id (obrigatório)
POST /api/lessons - Modo ÚNICO (name, position) OU MÚLTIPLO (names[], startPosition)
PUT /api/lessons/[id] - Atualizar (incluindo toggle completed)
  - Se completed: true → atualizar completed_at, courses.completed_lessons++, log activity
  - Se completed: false → completd_at = null, courses.completed_lessons--
DELETE /api/lessons/[id] - Deletar (atualizar courses.total_lessons)
PUT /api/lessons/reorder - Reordenar aulas
```

### PROMPT 4.6: User endpoints

Crie `src/app/api/user/` com:

```
GET /api/user - Retornar usuário autenticado SEM password_hash
PUT /api/user - Atualizar first_name, last_name, bio, timezone, avatar_url
POST /api/user/change-password - Validar senha atual, atualizar nova
POST /api/user/upload-avatar - FormData, validar tipo/tamanho, upload Supabase Storage, retornar URL
```

---

## FASE 5: COMPONENTES

### PROMPT 5.1: Layout components

Crie `components/layout/Sidebar.tsx`:

- Width 240px, bg-accent, border-right border-border-accent
- Logo + título "EduTracker"
- Navigation items dinâmicos com active highlight
- Footer com plano info
- Usar Lucide icons

Crie `components/layout/Header.tsx`:

- Height 64px, bg-main, border-bottom border-border-accent
- Título e subtítulo dinâmicos (props)
- Avatar com dropdown (Perfil, Logout)
- Theme toggle button

### PROMPT 5.2: Auth forms

Crie em `components/auth/`:

**LoginForm.tsx**

- Campos: email, password
- React Hook Form + Zod
- Botões: "Entrar", "Continuar com Google"
- Links: "Esqueceu senha?", "Registre-se"

**RegisterForm.tsx**

- Campos: full_name, email, password, password_confirm
- Validação em tempo real
- Botão "Criar conta"
- Link "Faça login"

**VerifyEmailForm.tsx**

- Mostrar email para confirmar
- Botão "Reenviar e-mail"
- Link "Usar outro e-mail"

**ForgotPasswordForm.tsx**

- Campo email
- Botão "Enviar link de recuperação"
- Link "Voltar ao login"

### PROMPT 5.3: Dashboard components

Crie em `components/dashboard/`:

**MetricsCard.tsx**

- Props: label, value, icon, iconBgColor
- Card com ícone + valor + label
- Baseado em design_system seção 7.1

**ProgressChart.tsx**

- Gráfico donut com Tremor
- Dados: áreas com progresso
- Mostrar percentual total

**ActivityList.tsx**

- Últimas 5 atividades
- Ícones diferentes por tipo
- Timestamp relativo (date-fns)

**CoursesList.tsx**

- Últimos 3 cursos atualizados
- Badge plataforma
- Progress bar
- Últimas 5 aulas do curso

**AreaCard.tsx**

- Borda colorida conforme area.color
- Stats: total aulas, cursos, concluídos
- Progress bar
- Clicável

### PROMPT 5.4: Console forms

Crie em `components/console/`:

**AreaForm.tsx**

- Input name (max 120 chars)
- Color picker (10 cores: red, rose, amber, purple, fuchsia, indigo, blue, teal, green, lime)
- Botões Adicionar/Cancelar

**PlatformForm.tsx**

- Mesmo que AreaForm

**CourseForm.tsx**

- Input name
- Select área
- Select plataforma
- Botões Adicionar/Cancelar

**LessonForm.tsx**

- Checkbox "Modo múltiplas aulas"
- Se unchecked: Input name, input position
- Se checked: Textarea (nomes, um por linha), input start_position

### PROMPT 5.5: Console lists with drag-n-drop

Crie em `components/console/`:

**DraggableAreaList.tsx**

- Use @dnd-kit (DndContext, SortableContext, useSortable)
- Mostrar drag handle icon (GripVertical)
- Badge com cor da área
- Ícones edit/delete
- Quando reorder: salvar via API

**DraggablePlatformList.tsx**

- Mesmo padrão

**DraggableCourseList.tsx**

- Lista de cursos por área (tabs ou seleção)
- Drag handle
- Badge plataforma
- Ícones edit/delete

**DraggableLessonList.tsx**

- Lista de aulas por curso
- Checkbox para marcar completed
- Drag handle
- Ao completar: mudar cor/opacity
- Ícones edit/delete

### PROMPT 5.6: User profile components

Crie em `components/user/`:

**ProfileForm.tsx**

- Seção: Informações Básicas (email read-only)
- Seção: Dados Pessoais (first_name, last_name, bio, timezone)
- Botões Salvar/Cancelar

**ChangePasswordForm.tsx**

- Current password, new password, confirm password
- Botão "Alterar senha"

**AvatarUpload.tsx**

- Imagem circular com overlay
- Click para upload
- Validar tipo (image/\*), tamanho (10MB)
- Upload para Supabase Storage
- Mostrar preview após upload

**SubscriptionModal.tsx**

- Placeholder modal
- Texto "Em breve!"

---

## FASE 6: HOOKS

### PROMPT 6.1: Auth hooks

Crie em `hooks/`:

**useAuth.ts**

- State: user, isLoading, error
- Functions: login, register, logout, checkAuth
- Usar Context ou localStorage para persistência

**useUser.ts**

- Buscar dados do usuário (GET /api/user)
- Atualizar perfil (PUT /api/user)
- Mudar senha (POST /api/user/change-password)
- Upload avatar (POST /api/user/upload-avatar)

### PROMPT 6.2: Resource hooks

Crie em `hooks/`:

**useAreas.ts** - GET, POST, PUT, DELETE, reorder áreas
**usePlatforms.ts** - GET, POST, PUT, DELETE, reorder plataformas
**useCourses.ts** - GET (filtro area_id), POST, PUT, DELETE, reorder
**useLessons.ts** - GET (query course_id), POST (modo único/múltiplo), PUT (toggle completed), DELETE, reorder

Todos com: loading, error, retry logic

### PROMPT 6.3: Dashboard hooks

Crie em `hooks/`:

**useDashboardMetrics.ts**

- Calcular: totalAulas, aulasC oncluídas, totalCursos, cursosConcluídos
- Retornar objeto com métricas

**useDashboardProgress.ts**

- Calcular: progressoGeral (média de áreas), progresso por área
- Retornar dados para gráfico donut

**useRecentActivities.ts**

- Buscar últimas 5 atividades
- Formatar com timestamp relativo

**useRecentCourses.ts**

- Buscar últimos 3 cursos atualizados
- Com lessons relacionadas

---

## FASE 7: PÁGINAS

### PROMPT 7.1: Auth pages

Crie em `app/(auth)/`:

**layout.tsx**

- Layout sem sidebar
- Centralizado
- Fundo dark

**login/page.tsx** - Usar LoginForm
**register/page.tsx** - Usar RegisterForm
**verify-email/page.tsx** - Usar VerifyEmailForm
**forgot-password/page.tsx** - Usar ForgotPasswordForm

### PROMPT 7.2: Dashboard layout

Crie em `app/(dashboard)/`:

**layout.tsx**

- Sidebar + Header + main content
- Sidebar fixo esquerda
- Header top
- Main content com padding

### PROMPT 7.3: Dashboard studies page

Crie `app/(dashboard)/dashboard/estudos/page.tsx`:

Layout:

- Header com título "Dashboard de Estudos"
- Grid 4 colunas: 4x MetricsCard
- Abaixo: 2 colunas (ProgressChart esquerda, ActivityList direita)
- Abaixo: Full width CoursesList

### PROMPT 7.4: Dashboard areas-courses page

Crie `app/(dashboard)/dashboard/areas-cursos/page.tsx`:

- Header
- Grid 3 colunas de AreaCards (dinâmico)
- Abaixo: 4x MetricsCard consolidadas
- Abaixo: Últimos 3 cursos atualizados

### PROMPT 7.5: Console pages

Crie em `app/(dashboard)/console/`:

**areas-plataformas/page.tsx**

- 2 colunas: Áreas | Plataformas
- Cada coluna: Form no topo + DraggableList abaixo

**cursos-projetos/page.tsx**

- Tabs por área
- Botão "+ Curso"
- DraggableCourseList
- Modal para criar/editar cursos

**aulas/page.tsx**

- Tabs por área (seleção)
- Listar cursos da área
- Click em curso → modal gerenciar aulas
- DraggableLessonList com LessonForm

### PROMPT 7.6: User pages

Crie em `app/(dashboard)/usuario/`:

**meu-perfil/page.tsx**

- Header
- AvatarUpload (topo)
- ProfileForm
- ChangePasswordForm

**minha-assinatura/page.tsx**

- Header
- SubscriptionModal

---

## FASE 8: MIDDLEWARE E AUTH

### PROMPT 8.1: Route protection middleware

Crie `src/middleware.ts`:

```
- Verificar se rota requer autenticação
- Se não autenticado + tenta /dashboard/* → redirect /login
- Se autenticado + tenta /login → redirect /dashboard
- Usar Supabase Auth para verificar sessão
```

### PROMPT 8.2: Auth context

Crie `src/context/AuthContext.tsx`:

```
- Context com: user, isLoading, login, logout
- Provider que verifica autenticação ao montar
- Envolver todo app no app/layout.tsx
```

---

## FASE 9: UTILITÁRIOS

### PROMPT 9.1: Progress calculations

Crie `src/lib/calculations.ts`:

```
calculateCourseProgress(course: Course): number
  return (course.completed_lessons / course.total_lessons) * 100

calculateAreaProgress(courses: Course[]): number
  return média de progresso dos cursos

calculateTotalProgress(areas: AreaWithCourses[]): number
  return média de progresso das áreas
```

### PROMPT 9.2: Formatting utilities

Crie `src/lib/utils.ts`:

```
getRelativeTime(date: Date): string
  return "há 2h", "há 1d", etc (date-fns)

formatDate(date: Date): string
  return data formatada

getColorByPickerIndex(index: number): string
  return cor do picker baseado no index

cn(...classes: string[]): string
  return merge de classes Tailwind
```

---

## ✅ PRONTO

Execute em ordem. Cada PROMPT depende do anterior.

Use Trae IDE para gerar código. Não escreva manualmente.
