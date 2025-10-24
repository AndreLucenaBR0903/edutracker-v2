# EduTracker - Product Requirements Document (PRD)

## 1. Visão Geral

**Nome do Projeto:** EduTracker
**Versão:** 2.0
**Objetivo:** Plataforma web para rastreamento e gerenciamento de progresso educacional em múltiplas áreas de estudo e plataformas de aprendizado

**Stack Tecnológico:**
- Frontend: Next.js v14, TypeScript, Tailwind CSS v3, ShadCN UI, Lucide React, Tremor
- Backend: Supabase (PostgreSQL), Supabase Auth
- ORM: DrizzleORM
- Banco de Dados: PostgreSQL (Supabase)

---

## 2. Estrutura da Aplicação

### 2.1 Áreas Principais

A aplicação é dividida em 3 áreas principais, com navegação diferenciada em cada uma:

#### **Área 01: Dashboard**
- Visualização de dados e estatísticas
- Sidebar com menu Dashboard
- Sub-telas:
  - Estudos (métricas consolidadas + gráfico donut + atividades recentes)
  - Áreas e Cursos (grid de cards por área + gráfico comparativo)

#### **Área 02: Console**
- Gerenciamento e CRUD de dados
- Sidebar com menu Console
- Sub-telas:
  - Áreas e Plataformas (criação/edição com drag-n-drop)
  - Cursos | Projetos (listagem e CRUD)
  - Aulas (gerenciamento por curso com modal)

#### **Área 03: Usuário**
- Gerenciamento de perfil e segurança
- Sidebar com menu Usuário
- Sub-telas:
  - Meu Perfil (informações básicas + dados pessoais + segurança)
  - Minha Assinatura (modal placeholder para futuro)

---

## 3. Autenticação e Acesso

### 3.1 Fluxo de Autenticação

**Telas de Autenticação (públicas):**

1. **Login**
   - Email + Senha
   - Botão "Entrar"
   - Botão "Continuar com Google" (OAuth - auto-provisionar)
   - Link "Esqueceu sua senha?" → Recuperação
   - Link "Registre-se" → Cadastro

2. **Cadastro**
   - Nome completo
   - Email
   - Senha (validação: 8+ caracteres, letras + números)
   - Confirmar Senha
   - Botão "Entrar"
   - Botão "Continuar com Google"
   - Link "Faça login" → Login

3. **Verificação de Email**
   - Exibe email para confirmação
   - Botão "Reenviar e-mail"
   - Link "Usar outro e-mail"
   - Info: "Não recebeu? Verifique spam"
   - Link "Voltar ao login"

4. **Recuperação de Senha**
   - Campo de email
   - Botão "Enviar link de recuperação"
   - Link "Voltar ao login"

### 3.2 Segurança

- Senhas: Mínimo 8 caracteres com letras (a-z, A-Z) e números (0-9)
- Tokens de verificação: TTL de 24 horas
- OAuth Google: Auto-provisionar usuário com email verificado
- Supabase Auth: Gerenciar sessões e tokens
- RLS Policies: Multi-tenant seguro (user_id em todas as tabelas)

---

## 4. Funcionalidades por Área

### 4.1 Dashboard - Estudos

**Componentes:**

1. **Métricas (Cards - 4 unidades)**
   - Total de Aulas
   - Aulas Concluídas
   - Total de Cursos
   - Cursos Concluídos
   - Cada card com ícone colorido

2. **Progresso Geral (Gráfico Donut - Tremor)**
   - Mostra todas as áreas cadastradas
   - Cores personalizadas por área
   - Percentual total de progresso (média aritmética)
   - Legenda colorida

3. **Atividades Recentes (Lista)**
   - Últimas 5 atividades
   - Tipos: Aula concluída, Curso adicionado
   - Timestamp relativo (2hs atrás)
   - Contexto: Nome da atividade + curso/área

4. **Últimos 3 Cursos Atualizados**
   - Cada curso mostra:
     - Nome Área - Nome Curso
     - Badge da plataforma (cor)
     - Progress bar (% concluído)
     - Últimas 5 aulas listadas

### 4.2 Dashboard - Áreas e Cursos

**Componentes:**

1. **Grid de Cards por Área (3 colunas)**
   - Borda superior com cor da área
   - Título da área
   - Total de Aulas
   - Total de Cursos
   - Cursos Concluídos
   - Progress bar com cor da área
   - Percentual de progresso
   - Clicável para visualizar detalhes (design futuro)

2. **Métricas Consolidadas** (idênticas ao Dashboard Estudos)

3. **Últimos 3 Cursos Atualizados** (idêntico ao Dashboard Estudos)

---

## 5. Console - Funcionalidades

### 5.1 Áreas e Plataformas

**Painel 01: Áreas de Estudo**

Funcionalidades:
- Listar todas as áreas do usuário
- Criar área: Nome + Seletor de cor (12 cores pré-definidas + custom)
- Editar área: Modal com mesma estrutura
- Deletar área: Confirmação via toaster
- Drag-n-drop: Reordenar áreas (salva automaticamente)
- Ícone edit/delete em cada item

**Painel 02: Plataformas**

Funcionalidades: Idênticas às áreas
- Listar, Criar, Editar, Deletar, Drag-n-drop

### 5.2 Cursos | Projetos

**Layout: Lista de Cursos**

Funcionalidades:
- Listar todos os cursos por área (tabs no topo)
- Abas dinâmicas: Uma aba por cada área cadastrada
- Criar curso: Botão "+ Curso | Projeto" → Modal
- Editar curso: Ícone edit → Modal
- Deletar curso: Ícone delete → Confirmação toaster
- Drag-n-drop: Reordenar cursos (salva automaticamente)

**Modal: Adicionar/Editar Curso**

Campos:
- Nome do Curso | Projeto (text input, max 300 chars)
- Área de Estudo (select dropdown, obrigatório)
- Plataforma (select dropdown, obrigatório)

### 5.3 Aulas (Gerenciamento)

**Passo 01: Seleção de Curso**

- Tabs por área
- Lista de cursos da área selecionada
- Click em um curso → abre tela de gerenciamento de aulas

**Passo 02: Gerenciamento de Aulas**

Layout:
- Cabeçalho: [Platform] Nome do Curso
- Botão "+ Aulas" (azul, topo direito)
- Lista de aulas:
  - Ícone drag
  - Checkbox (completed)
  - Nome da aula
  - Ícone edit
  - Ícone delete

Funcionalidades:
- Adicionar aula(s): Modal com 2 modos
  - Modo Único: 1 aula por vez
  - Modo Múltiplo: Várias aulas (uma por linha)
- Editar aula: Modal idêntica
- Deletar aula: Confirmação toaster
- Drag-n-drop: Reordenar aulas (salva automaticamente)
- Checkbox: Marcar como concluída (salva automaticamente)

**Modal: Adicionar/Editar Aulas**

Modo Único:
- Nome da Aula (text input, max 300 chars)
- Ordem (number, auto-incrementa)
- Checkbox: "Modo múltiplas aulas (uma por linha)"

Modo Múltiplo:
- Nomes das Aulas (textarea, uma por linha)
- Ordem (number, initial value = 01, incrementa automaticamente)
- Checkbox: "Modo múltiplas aulas (uma por linha)"

Validações:
- Nome obrigatório (não vazio)
- Ordem calculada automaticamente
- Ao salvar: atualizar total_lessons em courses

---

## 6. Área do Usuário

### 6.1 Meu Perfil

**Seção 01: Informações Básicas** (read-only)
- Nome completo
- Data de cadastro
- Email
- Último acesso
- Avatar: Imagem circular com ícone de câmera
  - Upload: Supabase Storage, máx 10MB

**Seção 02: Dados Pessoais** (editável)
- Nome (first_name)
- Sobrenome (last_name)
- Bio (textarea, max 500 chars)
- Fuso Horário (select dropdown)
- Botões: "Salvar alterações" (azul) | "Cancelar alterações" (vermelho)

**Seção 03: Segurança**
- Senha atual (password input)
- Nova senha (password input, validação: 8+, letras + números)
- Confirmar nova senha
- Botão: "Alterar senha" (azul)

### 6.2 Minha Assinatura

- Modal placeholder: "Em breve!"
- Futuro: Gerenciar plano, visualizar dados de subscrição

---

## 7. Sidebar e Navegação

### 7.1 Sidebar Geral

```
Dashboard
├─ Estudos (icone: clock)
└─ Áreas e Cursos (icone: grid)

Console
├─ Áreas e Plataformas (icone: layers)
├─ Cursos | Projetos (icone: book)
└─ Aulas (icone: list)

[Footer]
Plano Free [FREE]
Fazer upgrade
```

### 7.2 Sidebar Usuário

```
Usuário
├─ Meu perfil (icone: user, ativo)
├─ Minha assinatura (icone: star)
└─ retornar (icone: arrow-left) → volta para Dashboard
```

---

## 8. Header

**Componentes Fixos:**

- Logo EduTracker (esquerda)
- Título dinâmico (ex: "Dashboard de Estudos")
- Subtítulo dinâmico (ex: "Acompanhe seu progresso e estatísticas de aprendizado")
- Avatar do usuário (direita, clicável) + Menu dropdown
  - Opções: Meu Perfil, Logout

---

## 9. Dados e Relacionamentos

### 9.1 Estrutura de Dados

**Usuário:**
- email (unique)
- full_name, first_name, last_name
- avatar_url (Supabase Storage)
- bio (max 500)
- timezone (display only)
- auth_provider (email | google)

**Áreas:**
- user_id (FK)
- name (max 120)
- color (hex)
- position (drag-n-drop order)

**Plataformas:**
- user_id (FK)
- name (max 120)
- color (hex)
- position (drag-n-drop order)

**Cursos:**
- user_id (FK)
- area_id (FK)
- platform_id (FK)
- name (max 300)
- total_lessons (calculado)
- completed_lessons (calculado)

**Aulas:**
- user_id (FK)
- course_id (FK)
- name (max 300)
- position (ordem)
- completed (boolean)
- completed_at (timestamp, nullable)

**Activity Log:**
- user_id (FK)
- activity_type (lesson_completed | course_added)
- related_entity_id (uuid)
- metadata (jsonb)

### 9.2 Cálculos Principais

- **Total de Aulas:** SUM(lessons) agrupado por user_id
- **Aulas Concluídas:** COUNT(lessons WHERE completed=true) por user_id
- **Total de Cursos:** COUNT(courses) por user_id
- **Cursos Concluídos:** COUNT(courses WHERE completed_lessons > 0) por user_id
- **Progresso Geral (%):** AVG(SUM(lessons.completed) / SUM(lessons.total)) por area
- **Progress Específica (%):** (completed_lessons / total_lessons) * 100 por course

---

## 10. Fluxos de Usuário

### 10.1 Fluxo de Onboarding

1. Acessa aplicação → Tela de Login
2. Clica "Registre-se" → Tela de Cadastro
3. Preenche dados → Clica "Entrar"
4. Recebe email de verificação
5. Clica link → Email verificado
6. Redirecionado para Dashboard
7. Vai para Console > Áreas e Plataformas
8. Cria primeira área
9. Cria primeira plataforma
10. Vai para Console > Cursos
11. Cria primeiro curso
12. Vai para Console > Aulas
13. Adiciona aulas ao curso
14. Volta ao Dashboard para visualizar progresso

### 10.2 Fluxo de Uso Diário

1. Acessa Dashboard > Estudos
2. Visualiza métricas e atividades recentes
3. Vai para Console > Aulas
4. Marca aulas como concluídas (checkbox)
5. Volta ao Dashboard para ver progresso atualizado

### 10.3 Fluxo de Reordenação (Drag-n-drop)

1. Acessa Console > Áreas e Plataformas
2. Drag-n-drop uma área
3. Salva automaticamente
4. Volta ao Dashboard > Áreas e Cursos
5. Ordem refletida nos cards de áreas

---

## 11. Requisitos Não-Funcionais

### 11.1 Performance
- Load time inicial: < 2s
- API responses: < 500ms
- Drag-n-drop: Feedback imediato
- Queries: Otimizadas com índices

### 11.2 Segurança
- HTTPS apenas
- RLS Policies habilitadas (Supabase)
- User_id sempre presente em queries
- Password hashing com bcrypt
- CORS configurado

### 11.3 Confiabilidade
- Backup automático (Supabase)
- Tratamento de erros com toasters
- Validação client-side + server-side
- Confirmação antes de deletar dados

### 11.4 Escalabilidade
- Preparado para múltiplos planos (free, pro, enterprise)
- RLS permite multi-tenancy seguro
- Índices otimizados para crescimento

---

## 12. Roadmap (Futuro)

### Versão 2.1
- Página detalhada por área
- Filtros no Dashboard

### Versão 3.0 (SaaS)
- Planos pagos (Pro, Enterprise)
- Limite de cursos por plano
- 2FA/MFA

### Versão 4.0
- Mobile app
- Integração com APIs de plataformas
- Sincronização automática

---

**Versão:** 2.0 | **Data:** Outubro 2025 | **Status:** Aprovado
