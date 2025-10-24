# PROMPTS PARA TRAE IDE - API Endpoints

## CONTEXTO GERAL

Você está criando os endpoints da API para a aplicação EduTracker em Next.js v14 com TypeScript.

**Stack:**
- Framework: Next.js v14 (App Router)
- Linguagem: TypeScript
- ORM: DrizzleORM
- Database: PostgreSQL (Supabase)
- Auth: Supabase Auth
- Validação: Zod

**Localização esperada dos arquivos:**
- `src/app/api/[resource]/route.ts`
- `src/app/api/[resource]/[id]/route.ts`

**Padrão de Resposta Geral:**
```typescript
{ success: boolean, data?: T, error?: string }
```

**Tratamento de Erros:**
- 400: Bad Request (validação falha)
- 401: Unauthorized (sem autenticação)
- 403: Forbidden (sem permissão)
- 404: Not Found
- 500: Internal Server Error

---

## PROMPT 01: ENDPOINTS DE AUTENTICAÇÃO

**Objetivo:** Gerar endpoints de auth (login, cadastro, verificação, reset)

**Instruções:**

Crie os seguintes endpoints Next.js em `src/app/api/auth/route.ts`:

### POST /api/auth/register
**Descrição:** Registrar novo usuário com email e senha

**Body:**
```typescript
{
  email: string,
  full_name: string,
  password: string,
  password_confirm: string
}
```

**Validações Zod:**
- email: email válido (isEmail)
- full_name: string, min 3 chars, max 255 chars
- password: string, min 8 chars, deve conter letras (a-z, A-Z) e números (0-9)
- password_confirm: deve igualar password

**Lógica:**
1. Validar com Zod
2. Verificar se email já existe em users table
3. Hash password com bcrypt (Supabase native)
4. Criar usuário em users table com auth_provider='email'
5. Gerar token de verificação com TTL 24h
6. Salvar token em email_verification_tokens table
7. Enviar email com link de verificação (Supabase native)
8. Retornar: { success: true, message: "Verifique seu email" }

**Erros:**
- 400: Email já existe
- 400: Validação falha
- 500: Erro ao enviar email

---

### POST /api/auth/login
**Descrição:** Login com email e senha

**Body:**
```typescript
{
  email: string,
  password: string
}
```

**Validações Zod:**
- email: email válido
- password: string, min 8 chars

**Lógica:**
1. Validar com Zod
2. Buscar usuário por email em users table
3. Comparar password com password_hash usando bcrypt
4. Verificar se email_verified = true
5. Se sim: atualizar last_login_at = now()
6. Criar sessão com Supabase Auth
7. Retornar: { success: true, data: { user, session } }

**Erros:**
- 400: Email não encontrado
- 400: Senha incorreta
- 400: Email não verificado
- 500: Erro ao criar sessão

---

### POST /api/auth/verify-email
**Descrição:** Verificar email com token

**Body:**
```typescript
{
  token: string
}
```

**Validações Zod:**
- token: string, not empty

**Lógica:**
1. Validar com Zod
2. Buscar token em email_verification_tokens table
3. Verificar se não expirou (created_at + 24h > now())
4. Buscar usuário associado
5. Atualizar users.email_verified = true
6. Atualizar users.email_verified_at = now()
7. Deletar token
8. Retornar: { success: true, message: "Email verificado com sucesso" }

**Erros:**
- 404: Token não encontrado
- 400: Token expirado
- 500: Erro ao verificar

---

### POST /api/auth/resend-verification
**Descrição:** Reenviar email de verificação

**Body:**
```typescript
{
  email: string
}
```

**Validações Zod:**
- email: email válido

**Lógica:**
1. Validar com Zod
2. Buscar usuário por email
3. Verificar se email_verified = false
4. Deletar tokens antigos de email_verification_tokens para este usuário
5. Gerar novo token com TTL 24h
6. Salvar em email_verification_tokens
7. Enviar novo email com link
8. Retornar: { success: true, message: "Email reenviado" }

**Erros:**
- 404: Email não encontrado
- 400: Email já verificado
- 500: Erro ao enviar email

---

### POST /api/auth/forgot-password
**Descrição:** Solicitar link de recuperação de senha

**Body:**
```typescript
{
  email: string
}
```

**Validações Zod:**
- email: email válido

**Lógica:**
1. Validar com Zod
2. Buscar usuário por email
3. Gerar token de reset com TTL 24h
4. Salvar em password_reset_tokens
5. Enviar email com link de reset (incluir token)
6. Retornar: { success: true, message: "Link de recuperação enviado" }

**Erros:**
- 404: Email não encontrado
- 500: Erro ao enviar email

---

### POST /api/auth/reset-password
**Descrição:** Resetar senha com token

**Body:**
```typescript
{
  token: string,
  password: string,
  password_confirm: string
}
```

**Validações Zod:**
- token: string, not empty
- password: string, min 8, letras + números
- password_confirm: deve igualar password

**Lógica:**
1. Validar com Zod
2. Buscar token em password_reset_tokens
3. Verificar se não expirou (created_at + 24h > now())
4. Buscar usuário associado
5. Hash nova password com bcrypt
6. Atualizar users.password_hash
7. Deletar token
8. Retornar: { success: true, message: "Senha alterada com sucesso" }

**Erros:**
- 404: Token não encontrado
- 400: Token expirado
- 500: Erro ao resetar

---

### POST /api/auth/logout
**Descrição:** Fazer logout do usuário

**Validações:**
- Extrair user_id da sessão (requer autenticação)

**Lógica:**
1. Extrair user_id da sessão Supabase
2. Deletar sessão do Supabase Auth
3. Limpar cookies de sessão
4. Retornar: { success: true, message: "Logout realizado" }

**Erros:**
- 401: Não autenticado
- 500: Erro ao fazer logout

---

## PROMPT 02: ENDPOINTS DE ÁREAS

**Objetivo:** Gerar endpoints CRUD para áreas

**Instruções:**

Crie os seguintes endpoints em `src/app/api/areas/route.ts` e `src/app/api/areas/[id]/route.ts`:

### GET /api/areas
**Descrição:** Listar todas as áreas do usuário autenticado

**Autenticação:** Requerida (extrair user_id da sessão)

**Query Parameters:**
- Nenhum (retorna todas, ordenadas por position ASC)

**Lógica:**
1. Extrair user_id da sessão
2. Buscar todas as áreas onde user_id = session.user_id
3. Ordenar por position ASC
4. Retornar: { success: true, data: areas }

**Erros:**
- 401: Não autenticado
- 500: Erro ao buscar

---

### POST /api/areas
**Descrição:** Criar nova área

**Autenticação:** Requerida

**Body:**
```typescript
{
  name: string,
  color: string // hex color (#RRGGBB)
}
```

**Validações Zod:**
- name: string, min 1, max 120 chars
- color: string, regex hex color válido (#[0-9A-Fa-f]{6})

**Lógica:**
1. Validar com Zod
2. Extrair user_id da sessão
3. Calcular próxima position: MAX(position) + 1
4. Inserir em areas table: { id, user_id, name, color, position, created_at, updated_at }
5. Retornar: { success: true, data: newArea }

**Erros:**
- 401: Não autenticado
- 400: Validação falha
- 500: Erro ao inserir

---

### PUT /api/areas/[id]
**Descrição:** Atualizar área

**Autenticação:** Requerida

**Body:**
```typescript
{
  name?: string,
  color?: string,
  position?: number
}
```

**Validações Zod:**
- name: string, min 1, max 120 (se fornecido)
- color: hex válido (se fornecido)
- position: number, >= 0 (se fornecido)

**Lógica:**
1. Validar com Zod
2. Extrair user_id e area_id da sessão e URL
3. Verificar ownership: SELECT * FROM areas WHERE id = area_id AND user_id = session.user_id
4. Se não pertence ao usuário: retornar 403
5. Atualizar apenas campos fornecidos
6. Atualizar updated_at = now()
7. Retornar: { success: true, data: updatedArea }

**Erros:**
- 401: Não autenticado
- 403: Sem permissão
- 404: Área não encontrada
- 400: Validação falha
- 500: Erro ao atualizar

---

### DELETE /api/areas/[id]
**Descrição:** Deletar área e cascata (courses, lessons, activity_log)

**Autenticação:** Requerida

**Lógica:**
1. Extrair user_id e area_id
2. Verificar ownership
3. Se não pertence: retornar 403
4. Deletar em cascata:
   a. Delete FROM activity_log WHERE related_entity_id IN (SELECT id FROM lessons WHERE course_id IN (SELECT id FROM courses WHERE area_id = ?))
   b. Delete FROM lessons WHERE course_id IN (SELECT id FROM courses WHERE area_id = ?)
   c. Delete FROM courses WHERE area_id = ?
   d. Delete FROM areas WHERE id = ?
5. Retornar: { success: true, message: "Área deletada" }

**Erros:**
- 401: Não autenticado
- 403: Sem permissão
- 404: Não encontrado
- 500: Erro ao deletar

---

### PUT /api/areas/reorder
**Descrição:** Atualizar ordem de múltiplas áreas (drag-n-drop)

**Body:**
```typescript
{
  areas: Array<{ id: string, position: number }>
}
```

**Validações Zod:**
- areas: array of objects com id e position válidos

**Lógica:**
1. Validar com Zod
2. Extrair user_id
3. Para cada área na array:
   a. Verificar ownership (WHERE id = ? AND user_id = ?)
   b. Se não pertence: retornar 403
4. Executar batch update: UPDATE areas SET position = ? WHERE id = ?
5. Retornar: { success: true, data: updatedAreas }

**Erros:**
- 401: Não autenticado
- 403: Sem permissão em alguma área
- 400: Validação falha
- 500: Erro ao atualizar

---

## PROMPT 03: ENDPOINTS DE PLATAFORMAS

**Objetivo:** Gerar endpoints CRUD para plataformas

**Instruções:**

Estrutura idêntica ao PROMPT 02 (Áreas), mas para plataformas:

### GET /api/platforms
- Listar todas as plataformas do usuário, ordenadas por position ASC

### POST /api/platforms
- Criar nova plataforma
- Campos: name, color
- Calcular position como MAX + 1

### PUT /api/platforms/[id]
- Atualizar plataforma
- Campos: name, color, position
- Verificar ownership

### DELETE /api/platforms/[id]
- Deletar plataforma
- Verificar se há courses associados (validação)
- Se sim: retornar 400 "Plataforma possui cursos associados"
- Deletar apenas se vazio

### PUT /api/platforms/reorder
- Atualizar ordem de múltiplas plataformas
- Mesmo padrão de reorder de áreas

---

## PROMPT 04: ENDPOINTS DE CURSOS

**Objetivo:** Gerar endpoints CRUD para cursos

**Instruções:**

Crie os seguintes endpoints em `src/app/api/courses/route.ts` e `src/app/api/courses/[id]/route.ts`:

### GET /api/courses
**Descrição:** Listar todos os cursos do usuário (filtrar por area_id opcional)

**Autenticação:** Requerida

**Query Parameters:**
- area_id?: string (opcional, filtrar por área)

**Lógica:**
1. Extrair user_id
2. Se area_id fornecido: SELECT * FROM courses WHERE user_id = ? AND area_id = ?
3. Senão: SELECT * FROM courses WHERE user_id = ?
4. Ordenar por updated_at DESC
5. Retornar: { success: true, data: courses }

---

### POST /api/courses
**Descrição:** Criar novo curso

**Body:**
```typescript
{
  name: string,
  area_id: string,
  platform_id: string,
  description?: string
}
```

**Validações Zod:**
- name: string, min 1, max 300
- area_id: UUID válido
- platform_id: UUID válido
- description: string, max 1000 (se fornecido)

**Lógica:**
1. Validar com Zod
2. Extrair user_id
3. Verificar ownership de area_id e platform_id
4. Inserir em courses: { id, user_id, area_id, platform_id, name, description, total_lessons: 0, completed_lessons: 0 }
5. Log activity: "course_added"
6. Retornar: { success: true, data: newCourse }

**Erros:**
- 401: Não autenticado
- 403: Sem permissão na área ou plataforma
- 400: Validação falha
- 500: Erro ao inserir

---

### GET /api/courses/[id]
**Descrição:** Buscar curso específico com lições relacionadas

**Autenticação:** Requerida

**Lógica:**
1. Extrair user_id e course_id
2. Buscar curso verificando ownership
3. Buscar todas as lições: SELECT * FROM lessons WHERE course_id = ? ORDER BY position ASC
4. Retornar: { success: true, data: { course, lessons } }

**Erros:**
- 401: Não autenticado
- 403: Sem permissão
- 404: Curso não encontrado

---

### PUT /api/courses/[id]
**Descrição:** Atualizar curso

**Body:**
```typescript
{
  name?: string,
  description?: string,
  area_id?: string,
  platform_id?: string
}
```

**Validações Zod:**
- Mesmas do POST

**Lógica:**
1. Validar com Zod
2. Verificar ownership
3. Se area_id ou platform_id alterados: verificar ownership deles
4. Atualizar campos fornecidos
5. Atualizar updated_at
6. Retornar: { success: true, data: updatedCourse }

**Erros:**
- 401, 403, 404, 400, 500

---

### DELETE /api/courses/[id]
**Descrição:** Deletar curso e cascata (lessons, activity_log)

**Lógica:**
1. Verificar ownership
2. Delete FROM activity_log WHERE related_entity_id IN (SELECT id FROM lessons WHERE course_id = ?)
3. Delete FROM lessons WHERE course_id = ?
4. Delete FROM courses WHERE id = ?
5. Retornar: { success: true, message: "Curso deletado" }

---

### PUT /api/courses/reorder
**Descrição:** Reordenar cursos (mesmo padrão de áreas)

**Body:**
```typescript
{
  courses: Array<{ id: string, position: number }>
}
```

---

## PROMPT 05: ENDPOINTS DE AULAS

**Objetivo:** Gerar endpoints CRUD para aulas

**Instruções:**

Crie os seguintes endpoints em `src/app/api/lessons/route.ts` e `src/app/api/lessons/[id]/route.ts`:

### GET /api/lessons
**Descrição:** Listar aulas de um curso

**Autenticação:** Requerida

**Query Parameters:**
- course_id: string (obrigatório)

**Lógica:**
1. Validar course_id
2. Extrair user_id
3. Verificar ownership do course
4. SELECT * FROM lessons WHERE course_id = ? ORDER BY position ASC
5. Retornar: { success: true, data: lessons }

---

### POST /api/lessons
**Descrição:** Criar uma ou múltiplas aulas

**Body (modo único):**
```typescript
{
  course_id: string,
  name: string,
  position: number
}
```

**Body (modo múltiplo):**
```typescript
{
  course_id: string,
  names: string[], // um nome por linha
  start_position: number
}
```

**Validações Zod:**
- course_id: UUID válido
- name (único): string, min 1, max 300
- names (múltiplo): array of strings, cada um max 300
- position/start_position: number >= 1

**Lógica:**
1. Validar com Zod
2. Verificar ownership do course
3. Se modo único:
   a. Inserir 1 lesson
4. Se modo múltiplo:
   a. Para cada name: inserir lesson com position = start_position + index
5. Atualizar courses.total_lessons = COUNT(lessons WHERE course_id = ?)
6. Log activity: "lesson_added" para cada
7. Retornar: { success: true, data: newLessons, total_lessons_updated: number }

**Erros:**
- 401, 403, 404, 400, 500

---

### PUT /api/lessons/[id]
**Descrição:** Atualizar aula

**Body:**
```typescript
{
  name?: string,
  position?: number,
  completed?: boolean
}
```

**Lógica:**
1. Validar com Zod
2. Verificar ownership (via course_id)
3. Se completed = true e completed_at era null:
   a. Atualizar completed_at = now()
   b. Log activity: "lesson_completed"
   c. Atualizar courses.completed_lessons += 1
4. Se completed = false e completed_at era not null:
   a. Atualizar completed_at = null
   b. Atualizar courses.completed_lessons -= 1
5. Atualizar updated_at
6. Retornar: { success: true, data: updatedLesson, course_updated: boolean }

---

### DELETE /api/lessons/[id]
**Descrição:** Deletar aula

**Lógica:**
1. Verificar ownership
2. Se lesson.completed = true: atualizar courses.completed_lessons -= 1
3. Delete FROM activity_log WHERE related_entity_id = lesson_id
4. Delete FROM lessons WHERE id = ?
5. Atualizar courses.total_lessons = COUNT(...)
6. Retornar: { success: true, message: "Aula deletada" }

---

### PUT /api/lessons/reorder
**Descrição:** Reordenar aulas dentro de um curso

**Body:**
```typescript
{
  course_id: string,
  lessons: Array<{ id: string, position: number }>
}
```

---

## PROMPT 06: ENDPOINTS DE USUÁRIO

**Objetivo:** Gerar endpoints para gerenciar perfil e dados do usuário

**Instruções:**

Crie os seguintes endpoints em `src/app/api/user/route.ts`:

### GET /api/user
**Descrição:** Buscar dados do usuário autenticado

**Autenticação:** Requerida

**Lógica:**
1. Extrair user_id da sessão
2. SELECT * FROM users WHERE id = ?
3. Retornar sem password_hash: { success: true, data: userWithoutPassword }

---

### PUT /api/user
**Descrição:** Atualizar dados básicos do usuário

**Body:**
```typescript
{
  first_name?: string,
  last_name?: string,
  bio?: string,
  timezone?: string,
  avatar_url?: string
}
```

**Validações Zod:**
- first_name: string, max 100 (se fornecido)
- last_name: string, max 100 (se fornecido)
- bio: string, max 500 (se fornecido)
- timezone: string, formato válido (se fornecido)
- avatar_url: string, URL válida (se fornecido)

**Lógica:**
1. Validar com Zod
2. Extrair user_id
3. Atualizar apenas campos fornecidos
4. Atualizar updated_at
5. Retornar: { success: true, data: updatedUser }

---

### POST /api/user/change-password
**Descrição:** Alterar senha do usuário

**Body:**
```typescript
{
  current_password: string,
  new_password: string,
  new_password_confirm: string
}
```

**Validações Zod:**
- current_password: string, min 8
- new_password: string, min 8, letras + números
- new_password_confirm: deve igualar new_password
- new_password !== current_password

**Lógica:**
1. Validar com Zod
2. Extrair user_id
3. Buscar user.password_hash
4. Comparar current_password com hash
5. Se não bate: retornar 400 "Senha atual incorreta"
6. Hash new_password
7. Atualizar users.password_hash
8. Retornar: { success: true, message: "Senha alterada com sucesso" }

---

### POST /api/user/upload-avatar
**Descrição:** Upload de avatar para Supabase Storage

**Validações:**
- File: FormData com file
- File size: máx 10MB
- File type: image/* (jpg, png, gif, webp)

**Lógica:**
1. Extrair user_id
2. Extrair file do FormData
3. Validar tipo e tamanho
4. Upload para Supabase Storage: bucket "avatars", path: users/{user_id}
5. Gerar URL pública
6. Atualizar users.avatar_url
7. Retornar: { success: true, data: { avatar_url } }

**Erros:**
- 401: Não autenticado
- 400: File inválido ou muito grande
- 500: Erro ao upload

---

## NOTAS GERAIS

**Padrões de Resposta:**

Success (200):
```typescript
{
  success: true,
  data?: T,
  message?: string
}
```

Error (4xx/5xx):
```typescript
{
  success: false,
  error: string,
  code?: string
}
```

**Middleware Necessário:**
- Auth middleware: verificar sessão Supabase em cada request
- CORS: configurar para domínio da aplicação
- Rate limiting: considerar para endpoints públicos (login, register)

**Padrão de Erro Esperado:**
- Validação falha: 400 com mensagem Zod
- Não autenticado: 401
- Sem permissão: 403
- Não encontrado: 404
- Erro servidor: 500 com log

**Banco de Dados:**
- Usar DrizzleORM para todas as queries
- Sempre usar prepared statements (previne SQL injection)
- Índices já existem no schema

**Timestamps:**
- Usar `new Date()` ou `new Date().toISOString()`
- Supabase garante timezone UTC

---

**Total de Prompts:** 6
**Endpoints Totais:** ~40
**Tempo Estimado:** 120-150 minutos
**Complexidade:** Alta (validação, autenticação, CRUD, cascata)
