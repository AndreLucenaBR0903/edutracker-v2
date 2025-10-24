# PROMPTS PARA TRAE IDE - Drizzle Schema

## CONTEXTO GERAL

Você está criando o schema Drizzle ORM para a aplicação EduTracker em Next.js v14 com TypeScript.

**Stack:**
- ORM: DrizzleORM
- Database: PostgreSQL (Supabase)
- Tipo de Arquivo: TypeScript (.ts)
- Versão Node: 18+

**Localização esperada do arquivo:**
`src/db/schema.ts`

---

## PROMPT 01: SCHEMA COMPLETO - AUTENTICAÇÃO

**Objetivo:** Gerar tabelas de autenticação com tipos TypeScript

**Instruções:**

Crie as seguintes tabelas Drizzle com as especificações exatas:

### Tabela: users
- Coluna `id`: UUID, primary key, padrão: gen_random_uuid()
- Coluna `email`: varchar(255), unique, not null
- Coluna `full_name`: varchar(255), nullable
- Coluna `first_name`: varchar(100), nullable
- Coluna `last_name`: varchar(100), nullable
- Coluna `password_hash`: varchar(255), nullable (é null se OAuth)
- Coluna `auth_provider`: enum com valores 'email' | 'google', padrão: 'email'
- Coluna `email_verified`: boolean, padrão: false
- Coluna `email_verified_at`: timestamp, nullable
- Coluna `avatar_url`: varchar(500), nullable
- Coluna `bio`: text, nullable, comentário: "máximo 500 caracteres"
- Coluna `timezone`: varchar(50), padrão: 'GMT-3'
- Coluna `plan`: enum com valores 'free' | 'pro' | 'enterprise', padrão: 'free'
- Coluna `plan_active_until`: timestamp, nullable
- Coluna `last_login_at`: timestamp, nullable
- Coluna `created_at`: timestamp, padrão: now()
- Coluna `updated_at`: timestamp, padrão: now()

Índices:
- email (unique)
- email_verified
- auth_provider

Exporte também o tipo TypeScript: `export type User = typeof users.$inferSelect`

### Tabela: email_verification_tokens
- Coluna `id`: UUID, primary key, padrão: gen_random_uuid()
- Coluna `user_id`: UUID, foreign key referenciando users.id, not null
- Coluna `token`: varchar(255), unique, not null
- Coluna `expires_at`: timestamp, not null
- Coluna `created_at`: timestamp, padrão: now()

Índices:
- user_id
- token
- expires_at

### Tabela: password_reset_tokens
- Mesma estrutura que email_verification_tokens
- Diferença: nome da tabela

Exporte os tipos TypeScript para ambas as tabelas.

**Requerimentos Adicionais:**

- Use `sql` template para valores padrão quando necessário
- Configure as foreign keys com `references`
- Use snake_case para nomes de colunas no banco se necessário (validate com Supabase conventions)
- Ao final, export todas as tabelas como: `export const authTables = { users, emailVerificationTokens, passwordResetTokens }`
- Adicione comentários JSDoc para cada tabela explicando seu propósito

**Não inclua código React, apenas o schema Drizzle puro.**

---

## PROMPT 02: SCHEMA COMPLETO - ESTRUTURA EDUCACIONAL

**Objetivo:** Gerar tabelas de áreas, plataformas, cursos e aulas

**Instruções:**

Crie as seguintes tabelas Drizzle com as especificações exatas:

### Tabela: areas
- Coluna `id`: UUID, primary key, padrão: gen_random_uuid()
- Coluna `user_id`: UUID, foreign key referenciando users.id, not null
- Coluna `name`: varchar(120), not null
- Coluna `color`: varchar(7), comentário: "hex color (#RRGGBB)"
- Coluna `position`: integer, not null, comentário: "ordem para drag-n-drop"
- Coluna `created_at`: timestamp, padrão: now()
- Coluna `updated_at`: timestamp, padrão: now()

Índices:
- user_id
- (user_id, position) - índice composto

### Tabela: platforms
- Coluna `id`: UUID, primary key, padrão: gen_random_uuid()
- Coluna `user_id`: UUID, foreign key referenciando users.id, not null
- Coluna `name`: varchar(120), not null
- Coluna `color`: varchar(7), comentário: "hex color (#RRGGBB)"
- Coluna `position`: integer, not null
- Coluna `url`: varchar(500), nullable
- Coluna `created_at`: timestamp, padrão: now()
- Coluna `updated_at`: timestamp, padrão: now()

Índices:
- user_id
- (user_id, position) - índice composto

### Tabela: courses
- Coluna `id`: UUID, primary key, padrão: gen_random_uuid()
- Coluna `user_id`: UUID, foreign key referenciando users.id, not null
- Coluna `area_id`: UUID, foreign key referenciando areas.id, not null
- Coluna `platform_id`: UUID, foreign key referenciando platforms.id, not null
- Coluna `name`: varchar(300), not null
- Coluna `description`: text, nullable
- Coluna `total_lessons`: integer, padrão: 0
- Coluna `completed_lessons`: integer, padrão: 0
- Coluna `created_at`: timestamp, padrão: now()
- Coluna `updated_at`: timestamp, padrão: now()

Índices:
- user_id
- area_id
- platform_id
- (user_id, area_id) - índice composto
- (user_id, platform_id) - índice composto

### Tabela: lessons
- Coluna `id`: UUID, primary key, padrão: gen_random_uuid()
- Coluna `user_id`: UUID, foreign key referenciando users.id, not null
- Coluna `course_id`: UUID, foreign key referenciando courses.id, not null
- Coluna `name`: varchar(300), not null
- Coluna `position`: integer, not null, comentário: "ordem dentro do curso"
- Coluna `completed`: boolean, padrão: false
- Coluna `completed_at`: timestamp, nullable
- Coluna `created_at`: timestamp, padrão: now()
- Coluna `updated_at`: timestamp, padrão: now()

Índices:
- user_id
- course_id
- (course_id, position) - índice composto
- (user_id, completed)

Exporte todos os tipos TypeScript:
- export type Area = typeof areas.$inferSelect
- export type Platform = typeof platforms.$inferSelect
- export type Course = typeof courses.$inferSelect
- export type Lesson = typeof lessons.$inferSelect

**Requerimentos Adicionais:**

- Mantenha consistência de nomenclatura com o PROMPT 01
- Foreign keys devem referenciar corretamente as tabelas da auth
- Indices compostos devem usar `.index()` para melhor performance
- Adicione comentários explicando relacionamentos

**Não inclua código React, apenas o schema Drizzle puro.**

---

## PROMPT 03: SCHEMA COMPLETO - ACTIVITY LOG

**Objetivo:** Gerar tabela de log de atividades

**Instruções:**

Crie a seguinte tabela Drizzle:

### Tabela: activity_log
- Coluna `id`: UUID, primary key, padrão: gen_random_uuid()
- Coluna `user_id`: UUID, foreign key referenciando users.id, not null
- Coluna `activity_type`: enum com valores 'lesson_completed' | 'course_added', not null
- Coluna `related_entity_type`: enum com valores 'lesson' | 'course', not null
- Coluna `related_entity_id`: UUID, not null, comentário: "id da lição ou curso"
- Coluna `metadata`: jsonb, comentário: "informações contextuais (course_name, area_name, etc)"
- Coluna `created_at`: timestamp, padrão: now()

Índices:
- user_id
- (user_id, created_at) - índice composto para atividades recentes
- created_at

Exporte o tipo TypeScript:
- export type ActivityLog = typeof activityLog.$inferSelect

**Requerimentos Adicionais:**

- Usar `jsonb` para metadata (melhor performance em queries)
- Comentário no metadata sugerindo estrutura: { course_name?: string, area_name?: string, ... }
- Este é o último schema, então export um objeto consolidado com todas as tabelas

**Não inclua código React, apenas o schema Drizzle puro.**

---

## PROMPT 04: TIPOS CUSTOMIZADOS E INSERT TYPES

**Objetivo:** Gerar tipos para INSERT/UPDATE com validações

**Instruções:**

Para cada tabela criada nos PROPTs 01-03, gere também:

1. **Insert Types** (tipos para criação)
   - Exemplo: `export type NewUser = typeof users.$inferInsert`
   - Gere para todas as tabelas

2. **Tipos Customizados com Lógica**
   - `UserWithoutPassword`: tipo User sem password_hash
   - `ActivityLogInsert`: com validações de metadata obrigatória
   - `LessonWithProgress`: lição + percentual de progresso calculado

3. **Tipos Computados**
   - `AreaWithProgress`: área + progresso geral (%)
   - `CourseWithStats`: curso + total_lessons + completed_lessons + percentual
   - `LessonComplete`: lição com informações do curso e área
   - `DashboardMetrics`: métricas consolidadas (total aulas, concluídas, etc)

4. **Tipos para Relacionamentos**
   - `UserWithAreas`: User + areas array
   - `CourseWithLessons`: Course + lessons array
   - `AreaWithCourses`: Area + courses array

**Requerimentos:**

- Todos os tipos devem ser exportáveis
- Use `Omit<>` e `Pick<>` conforme necessário
- Adicione comentários JSDoc para cada tipo
- Agrupe tipos por categoria (Auth, Educational, Dashboard, Utils)
- Use `Partial<>` e `Required<>` onde apropriado

**Não inclua código React ou funções, apenas tipos TypeScript puros.**

---

## PROMPT 05: ENUMS GLOBAIS

**Objetivo:** Gerar enums para uso global na aplicação

**Instruções:**

Crie os seguintes enums TypeScript:

1. **AuthProvider**
   - Valores: 'email', 'google'

2. **UserPlan**
   - Valores: 'free', 'pro', 'enterprise'

3. **ActivityType**
   - Valores: 'lesson_completed', 'course_added'

4. **EntityType**
   - Valores: 'lesson', 'course'

**Requerimentos:**

- Use `as const` para inferir tipos literais
- Exporte também um tipo Union gerado a partir do enum
- Adicione comentários explicando cada enum
- Todos os enums devem estar em um arquivo separado ou no topo do schema

**Exemplo esperado:**
```typescript
export const AUTH_PROVIDER = {
  EMAIL: 'email',
  GOOGLE: 'google'
} as const;

export type AuthProvider = typeof AUTH_PROVIDER[keyof typeof AUTH_PROVIDER];
```

**Não inclua código React, apenas TypeScript puro.**

---

## ESTRUTURA ESPERADA DO ARQUIVO

Ao terminar todos os 5 prompts, o arquivo `src/db/schema.ts` deve ter aproximadamente esta estrutura:

```typescript
// ============ IMPORTS ============
import { pgTable, uuid, varchar, text, ... } from 'drizzle-orm/pg-core'

// ============ ENUMS & CONSTANTS ============
export const AUTH_PROVIDER = { ... }
export const USER_PLAN = { ... }
// ... outros enums

// ============ AUTH SCHEMA ============
export const users = pgTable(...)
export const emailVerificationTokens = pgTable(...)
export const passwordResetTokens = pgTable(...)

// ============ AUTH TYPES ============
export type User = ...
export type EmailVerificationToken = ...
// ... outros tipos

// ============ EDUCATIONAL SCHEMA ============
export const areas = pgTable(...)
export const platforms = pgTable(...)
export const courses = pgTable(...)
export const lessons = pgTable(...)

// ============ EDUCATIONAL TYPES ============
export type Area = ...
export type Platform = ...
// ... outros tipos

// ============ ACTIVITY SCHEMA ============
export const activityLog = pgTable(...)

// ============ ACTIVITY TYPES ============
export type ActivityLog = ...

// ============ CUSTOM TYPES ============
export type AreaWithProgress = ...
export type CourseWithStats = ...
// ... outros tipos

// ============ INSERT TYPES ============
export type NewUser = ...
export type NewArea = ...
// ... outros tipos

// ============ EXPORTS CONSOLIDADOS ============
export const schema = {
  auth: { users, emailVerificationTokens, passwordResetTokens },
  educational: { areas, platforms, courses, lessons },
  activity: { activityLog }
}
```

---

## NOTAS IMPORTANTES

- **Versionamento:** Drizzle v0.28+
- **PostgreSQL:** Use tipos nativos (uuid, jsonb, enum)
- **Type Safety:** Maximize inferência de tipos do Drizzle
- **Performance:** Índices otimizados para queries frequentes
- **Multi-tenancy:** Sempre incluir `user_id` para RLS no Supabase
- **Timestamps:** Usar `now()` do Drizzle, não JavaScript Date
- **Enums:** Definir em nível de schema para type safety

---

**Total de Prompts:** 5
**Tempo Estimado:** 45-60 minutos
**Complexidade:** Média-Alta (familiaridade com Drizzle recomendada)
