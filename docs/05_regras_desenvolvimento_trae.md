# REGRAS DE DESENVOLVIMENTO PARA TRAE IDE - EduTracker

## 1. PADRÕES GERAIS

### 1.1 Estrutura de Pastas

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts
│   │   ├── areas/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── platforms/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── courses/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── lessons/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── user/
│   │       └── route.ts
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── verify-email/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   ├── estudos/
│   │   │   │   └── page.tsx
│   │   │   └── areas-cursos/
│   │   │       └── page.tsx
│   │   ├── console/
│   │   │   ├── areas-plataformas/
│   │   │   │   └── page.tsx
│   │   │   ├── cursos-projetos/
│   │   │   │   └── page.tsx
│   │   │   └── aulas/
│   │   │       └── page.tsx
│   │   └── usuario/
│   │       ├── meu-perfil/
│   │       │   └── page.tsx
│   │       └── minha-assinatura/
│   │           └── page.tsx
│   └── layout.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── VerifyEmailForm.tsx
│   │   └── ForgotPasswordForm.tsx
│   ├── dashboard/
│   │   ├── MetricsCard.tsx
│   │   ├── ProgressChart.tsx
│   │   ├── ActivityList.tsx
│   │   ├── CoursesList.tsx
│   │   └── AreaCard.tsx
│   ├── console/
│   │   ├── AreaForm.tsx
│   │   ├── PlatformForm.tsx
│   │   ├── CourseForm.tsx
│   │   ├── LessonForm.tsx
│   │   ├── DraggableAreaList.tsx
│   │   ├── DraggableCourseList.tsx
│   │   └── DraggableLessonList.tsx
│   ├── user/
│   │   ├── ProfileForm.tsx
│   │   ├── PersonalDataForm.tsx
│   │   ├── ChangePasswordForm.tsx
│   │   ├── AvatarUpload.tsx
│   │   └── SubscriptionModal.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── NavMenu.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       └── Loading.tsx
├── db/
│   └── schema.ts
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── validation.ts
│   ├── utils.ts
│   └── db.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useUser.ts
│   ├── useAreas.ts
│   ├── usePlatforms.ts
│   ├── useCourses.ts
│   └── useLessons.ts
├── types/
│   └── index.ts
├── config/
│   └── constants.ts
└── styles/
    └── globals.css
```

### 1.2 Convenções de Nomenclatura

**Arquivos e Pastas:**
- Pastas: kebab-case (ex: `areas-plataformas`, `user-profile`)
- Componentes React: PascalCase (ex: `LoginForm.tsx`, `MetricsCard.tsx`)
- Utilitários/Hooks: camelCase (ex: `useAuth.ts`, `validation.ts`)
- Constantes: UPPER_SNAKE_CASE (ex: `MAX_FILE_SIZE`, `DEFAULT_TIMEZONE`)

**Variáveis e Funções:**
- Funções: camelCase (ex: `fetchAreas()`, `handleSubmit()`)
- Variáveis: camelCase (ex: `isLoading`, `userData`)
- Booleans: começar com `is`, `has`, `can` (ex: `isAuthenticated`, `hasError`)
- Event handlers: começar com `handle` (ex: `handleClick`, `handleChange`)

**Componentes:**
- Props: PascalCase ou camelCase (ex: `<Component isVisible={true} onSubmit={...} />`)
- Estados: camelCase (ex: `const [isOpen, setIsOpen] = useState(false)`)

### 1.3 Imports e Exports

**Ordem de Imports:**

```typescript
// 1. React e dependências externas
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. Componentes do projeto
import { Button } from '@/components/common/Button'
import { LoginForm } from '@/components/auth/LoginForm'

// 3. Hooks customizados
import { useAuth } from '@/hooks/useAuth'

// 4. Utilitários e tipos
import { validateEmail } from '@/lib/validation'
import type { User } from '@/types'

// 5. Estilos
import styles from './page.module.css'
```

**Exports:**
- Use named exports para reutilização
- Use default export apenas para páginas Next.js

```typescript
// ✅ Correto
export const LoginForm = () => { ... }
export const validateEmail = (email: string) => { ... }

// ✅ Para páginas
export default function LoginPage() { ... }
```

---

## 2. TYPESCRIPT

### 2.1 Type Safety

**Sempre especifique tipos:**

```typescript
// ❌ Evitar
const handleChange = (e) => { ... }
const fetchData = async () => { ... }

// ✅ Correto
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
const fetchData = async (): Promise<User[]> => { ... }
```

**Use tipos inferidos quando apropriado:**

```typescript
// ✅ Bom
const [count, setCount] = useState(0) // inferido como number
const user = { name: 'João', email: 'joao@example.com' } // inferido como object

// ✅ Melhor para complexo
type LoginFormData = {
  email: string
  password: string
}
const [formData, setFormData] = useState<LoginFormData>({ ... })
```

**Tipos customizados:**

```typescript
// ✅ Use interfaces para objetos
interface User {
  id: string
  email: string
  full_name: string
}

// ✅ Use type para unions e composições
type AuthProvider = 'email' | 'google'
type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

// ✅ Use generics para reutilização
interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
}
```

### 2.2 Null/Undefined Safety

```typescript
// ✅ Use optional chaining
const email = user?.email

// ✅ Use nullish coalescing
const timezone = user?.timezone ?? 'GMT-3'

// ✅ Use type guards
if (user && user.email) {
  // user.email é string aqui
}

// ✅ Evite any, use unknown se necessário
const handleData = (data: unknown) => {
  if (typeof data === 'string') {
    // data é string aqui
  }
}
```

---

## 3. COMPONENTES REACT

### 3.1 Estrutura de Componentes

```typescript
// ✅ Padrão esperado

import React, { useState, useEffect } from 'react'
import type { ReactNode } from 'react'

/**
 * Props do componente
 */
interface MyComponentProps {
  title: string
  onSubmit: (data: FormData) => Promise<void>
  children?: ReactNode
  isLoading?: boolean
}

/**
 * MyComponent - Descrição do que o componente faz
 * 
 * @example
 * <MyComponent title="Login" onSubmit={handleSubmit} />
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onSubmit,
  children,
  isLoading = false
}) => {
  const [state, setState] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Effect aqui
  }, [])

  const handleClick = async () => {
    try {
      // lógica
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    }
  }

  if (isLoading) return <Loading />

  return (
    <div>
      <h1>{title}</h1>
      {error && <Error message={error} />}
      {children}
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

// ✅ Display name para debugging
MyComponent.displayName = 'MyComponent'
```

### 3.2 Hooks

**Padrão de hooks customizados:**

```typescript
// ✅ src/hooks/useAuth.ts

import { useState, useCallback, useEffect } from 'react'

/**
 * Hook para gerenciar autenticação
 */
export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar autenticação ao montar
    checkAuth()
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/user')
      if (!response.ok) throw new Error('Não autenticado')
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { user, isLoading, error, checkAuth }
}
```

**Padrão de uso:**

```typescript
// ✅ Em componentes
export const Dashboard = () => {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <Loading />
  if (error) return <Error message={error} />
  if (!user) return <Redirect to="/login" />

  return <div>Welcome, {user.name}</div>
}
```

### 3.3 Forms

**Padrão de Form com React Hook Form + Zod:**

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Schema Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres')
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmitHandler = async (data: LoginFormData) => {
    try {
      await onSubmit(data)
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Erro ao enviar'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('password')}
        type="password"
        placeholder="Senha"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Entrar'}
      </button>

      {errors.root && <span>{errors.root.message}</span>}
    </form>
  )
}
```

---

## 4. API E BACKEND

### 4.1 Endpoints Pattern

**Estrutura de API Response:**

```typescript
// ✅ Sucesso
{
  success: true,
  data: { id: '123', name: 'João' }
}

// ✅ Erro
{
  success: false,
  error: 'Email já existe'
}

// ✅ Com paginação
{
  success: true,
  data: [...],
  pagination: {
    total: 100,
    page: 1,
    limit: 10
  }
}
```

### 4.2 Chamadas de API

**Padrão com fetch + tipos:**

```typescript
// ✅ src/lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

/**
 * Fazer requisição GET
 */
export const apiGet = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro na requisição')
  }

  const data: ApiResponse<T> = await response.json()
  if (!data.success) throw new Error(data.error || 'Erro desconhecido')

  return data.data as T
}

/**
 * Fazer requisição POST
 */
export const apiPost = async <T, D>(
  endpoint: string,
  body: D,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    body: JSON.stringify(body),
    ...options
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro na requisição')
  }

  const data: ApiResponse<T> = await response.json()
  if (!data.success) throw new Error(data.error || 'Erro desconhecido')

  return data.data as T
}

/**
 * Uso em componentes
 */
export const useLoginMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      setError(null)
      try {
        const user = await apiPost<User, LoginData>(
          '/api/auth/login',
          { email, password }
        )
        return user
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { mutate, isLoading, error }
}
```

---

## 5. VALIDAÇÃO

### 5.1 Zod Schemas

```typescript
// ✅ src/lib/validation.ts

import { z } from 'zod'

// Schemas reutilizáveis
export const emailSchema = z
  .string('Email obrigatório')
  .email('Email inválido')

export const passwordSchema = z
  .string('Senha obrigatória')
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[a-zA-Z]/, 'Deve conter letras')
  .regex(/[0-9]/, 'Deve conter números')

export const nameSchema = z
  .string('Nome obrigatório')
  .min(1, 'Nome obrigatório')
  .max(255, 'Máximo 255 caracteres')

// Schemas complexos
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const registerSchema = z.object({
  email: emailSchema,
  full_name: nameSchema,
  password: passwordSchema,
  password_confirm: z.string('Confirmação obrigatória')
}).refine(
  (data) => data.password === data.password_confirm,
  {
    message: 'Senhas não correspondem',
    path: ['password_confirm']
  }
)

export const areaSchema = z.object({
  name: z
    .string('Nome obrigatório')
    .min(1, 'Nome obrigatório')
    .max(120, 'Máximo 120 caracteres'),
  color: z
    .string('Cor obrigatória')
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor hex inválida')
})

// Types inferidos
export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type AreaData = z.infer<typeof areaSchema>
```

---

## 6. ESTADO GLOBAL

**Preferir Context + Hooks > Redux para esta aplicação:**

```typescript
// ✅ src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const user = await apiGet<User>('/api/user')
      setUser(user)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const user = await apiPost<User, { email; password }>(
      '/api/auth/login',
      { email, password }
    )
    setUser(user)
  }

  const logout = async () => {
    await apiPost('/api/auth/logout', {})
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider')
  }
  return context
}
```

---

## 7. TRATAMENTO DE ERROS

### 7.1 Try-Catch Pattern

```typescript
// ✅ Padrão esperado

const handleSubmit = async (data: FormData) => {
  setError(null)
  try {
    const result = await apiPost('/api/action', data)
    // sucesso
    showToast('Sucesso!', 'success')
  } catch (err) {
    const message = err instanceof Error 
      ? err.message 
      : 'Erro desconhecido'
    setError(message)
    showToast(message, 'error')
  }
}
```

### 7.2 Error Boundaries

```typescript
// ✅ src/components/ErrorBoundary.tsx

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div>Algo deu errado: {this.state.error?.message}</div>
        )
      )
    }

    return this.props.children
  }
}
```

---

## 8. PERFORMANCE

### 8.1 Otimizações

```typescript
// ✅ Use React.memo para componentes puros
export const MetricsCard = React.memo(({ value, title }: Props) => {
  return <div>{title}: {value}</div>
})

// ✅ Use useCallback para memoizar funções
const handleClick = useCallback(() => {
  // lógica
}, [dependencies])

// ✅ Use useMemo para cálculos pesados
const totalLessons = useMemo(
  () => courses.reduce((sum, c) => sum + c.total_lessons, 0),
  [courses]
)

// ✅ Code splitting com dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />,
  ssr: false
})

// ✅ Image optimization
import Image from 'next/image'
<Image src={avatar} alt="Avatar" width={40} height={40} />
```

### 8.2 Queries e Mutations

```typescript
// ✅ SWR ou React Query para estado de dados
import useSWR from 'swr'

const { data: areas, error, isLoading } = useSWR(
  '/api/areas',
  apiGet<Area[]>,
  { revalidateOnFocus: false }
)

// ✅ Invalidar cache após mutation
const mutate = useCallback(async (formData) => {
  await apiPost('/api/areas', formData)
  // Revalidar dados
  mutate('/api/areas')
}, [mutate])
```

---

## 9. SEGURANÇA

### 9.1 Proteção de Rotas

```typescript
// ✅ Route Protection

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function ProtectedPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  return <Dashboard user={session.user} />
}
```

### 9.2 Sanitização

```typescript
// ✅ Sanitizar inputs

import DOMPurify from 'dompurify'

const sanitizedBio = DOMPurify.sanitize(user.bio)

// ✅ Validar no backend também
export const updateUser = async (data: UpdateUserData) => {
  const validated = userUpdateSchema.parse(data)
  // continuar
}
```

### 9.3 Environment Variables

```typescript
// ✅ Usar variáveis de ambiente

// .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=xxx (private)

// src/config/env.ts
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  // SUPABASE_KEY nunca em client-side
}
```

---

## 10. TESTES

### 10.1 Unit Tests

```typescript
// ✅ Exemplo com Vitest + React Testing Library

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/components/auth/LoginForm'

describe('LoginForm', () => {
  it('deve renderizar os campos de email e senha', () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
  })

  it('deve submeter o formulário com dados válidos', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com')
    await userEvent.type(screen.getByPlaceholderText('Senha'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})
```

---

## 11. LOGGING E DEBUGGING

### 11.1 Logging Pattern

```typescript
// ✅ src/lib/logger.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const log = (level: LogLevel, message: string, data?: any) => {
  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`
  
  if (process.env.NODE_ENV === 'development') {
    console.log(prefix, message, data || '')
  }
  
  // Em produção, enviar para serviço de logging (Sentry, etc)
  if (process.env.NODE_ENV === 'production' && level === 'error') {
    // reportToSentry(message, data)
  }
}

export const logger = {
  debug: (msg: string, data?: any) => log('debug', msg, data),
  info: (msg: string, data?: any) => log('info', msg, data),
  warn: (msg: string, data?: any) => log('warn', msg, data),
  error: (msg: string, data?: any) => log('error', msg, data)
}

// Uso
logger.info('User logged in', { userId: user.id })
logger.error('Failed to fetch data', { endpoint: '/api/areas' })
```

---

## 12. COMENTÁRIOS E DOCUMENTAÇÃO

### 12.1 JSDoc Comments

```typescript
// ✅ Comentar funções complexas e públicas

/**
 * Calcula o progresso total do usuário
 * 
 * @param courses - Array de cursos do usuário
 * @returns Percentual de progresso (0-100)
 * 
 * @example
 * const progress = calculateTotalProgress(courses)
 * console.log(progress) // 72.5
 */
export const calculateTotalProgress = (courses: Course[]): number => {
  if (courses.length === 0) return 0
  const total = courses.reduce((sum, c) => sum + c.total_lessons, 0)
  const completed = courses.reduce((sum, c) => sum + c.completed_lessons, 0)
  return (completed / total) * 100
}
```

### 12.2 Inline Comments

```typescript
// ✅ Comentar lógica não óbvia

// Calcular próxima posição baseado no máximo atual
// necessário para manter ordem consistente em drag-n-drop
const nextPosition = Math.max(...areas.map(a => a.position)) + 1

// ❌ Evitar comentários óbvios
// const name = 'João' // Atribuir nome
```

---

## 13. REQUISITOS ESPECÍFICOS DA APLICAÇÃO

### 13.1 Multi-tenancy

```typescript
// ✅ SEMPRE incluir user_id em queries

export const getUserAreas = async (userId: string) => {
  const areas = await db
    .select()
    .from(schema.areas)
    .where(eq(schema.areas.user_id, userId)) // OBRIGATÓRIO
    .orderBy(asc(schema.areas.position))
  return areas
}
```

### 13.2 Drag-n-Drop

```typescript
// ✅ Atualizar position e salvar automaticamente

const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event
  
  if (over && active.id !== over.id) {
    const newPosition = calculateNewPosition(active, over)
    
    // Atualizar estado imediatamente (optimistic)
    setAreas(prev => 
      prev.map(a => 
        a.id === active.id ? { ...a, position: newPosition } : a
      )
    )
    
    // Salvar no servidor
    try {
      await apiPut(`/api/areas/${active.id}`, { position: newPosition })
    } catch (err) {
      // Reverter em caso de erro
      await reloadAreas()
    }
  }
}
```

### 13.3 Modal de Múltiplas Aulas

```typescript
// ✅ Suportar modo único e múltiplo

interface LessonFormProps {
  mode: 'single' | 'multiple'
  onSubmit: (data: LessonData | LessonData[]) => Promise<void>
}

export const LessonForm: React.FC<LessonFormProps> = ({ mode, onSubmit }) => {
  if (mode === 'single') {
    return (
      <form onSubmit={handleSubmit}>
        <input {...register('name')} />
        <input {...register('position', { valueAsNumber: true })} />
        <button>Adicionar</button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea {...register('names')} />
      <input {...register('startPosition', { valueAsNumber: true })} />
      <button>Adicionar Múltiplas</button>
    </form>
  )
}
```

### 13.4 Cálculos de Progresso

```typescript
// ✅ Cálculos consistentes

/**
 * Progresso geral = média de todas as áreas
 * Progresso da área = média de todos os cursos da área
 * Progresso do curso = (aulas_concluídas / total_aulas) * 100
 */

export const calculateProgress = (course: Course): number => {
  if (course.total_lessons === 0) return 0
  return (course.completed_lessons / course.total_lessons) * 100
}

export const calculateAreaProgress = (courses: Course[]): number => {
  if (courses.length === 0) return 0
  const totalProgress = courses.reduce(
    (sum, course) => sum + calculateProgress(course),
    0
  )
  return totalProgress / courses.length
}

export const calculateTotalProgress = (areas: AreaWithCourses[]): number => {
  if (areas.length === 0) return 0
  const totalProgress = areas.reduce(
    (sum, area) => sum + calculateAreaProgress(area.courses),
    0
  )
  return totalProgress / areas.length
}
```

---

## 14. CHECKLIST DE QUALIDADE

Antes de considerar uma feature completa:

- [ ] TypeScript: Sem `any` types
- [ ] Validação: Input validado com Zod (client + server)
- [ ] Testes: Funções críticas testadas
- [ ] Erros: Try-catch implementado, erros tratados
- [ ] Performance: Sem renders desnecessários
- [ ] Segurança: User_id verificado, SQL injection prevenido
- [ ] Acessibilidade: Labels, ARIA attributes quando necessário
- [ ] Documentação: JSDoc para funções públicas
- [ ] Logging: Erros logados apropriadamente
- [ ] Responsividade: Testado em mobile/tablet
- [ ] Cleanup: Sem console.log em produção

---

**Versão:** 1.0
**Última Atualização:** Outubro 2025
**Manutenedor:** Equipe EduTracker
