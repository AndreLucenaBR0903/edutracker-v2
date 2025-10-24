# REGRAS DE DESIGN SYSTEM PARA TRAE IDE - EduTracker

## 1. VISÃO GERAL

Este documento define os padrões visuais, componentes e tokens de design para a aplicação EduTracker. Baseado nos **tokens.json** fornecido, suporta tema **Dark** (padrão) e **Light** (futuro).

**Stack Visual:**
- Tailwind CSS v3
- ShadCN UI
- Lucide React (ícones)
- Tremor (gráficos)
- Tokens customizados (CSS Variables)

---

## 2. TEMA DARK (PADRÃO)

### 2.1 Paleta de Cores Base

#### Cores de Fundo

| Nome | Token | Valor | Uso |
|------|-------|-------|-----|
| Background Principal | `bg-main` | `#0a0a0a` | Fundo geral da aplicação |
| Background Accent | `bg-accent` | `#18181b` | Cards, componentes, overlays |
| Drag & Drop | `drag-n-drop` | `#27272a` | Área de drop, zones ativas |
| Progress Bar BG | `progress-bar` | `#1e2939` | Fundo de progress bars |
| Border Accent | `border-accent` | `#314158` | Bordas, dividers |

#### Cores de Texto

| Nome | Token | Valor | Uso |
|------|-------|-------|-----|
| Primário | `text-primary` | `#fafafa` | Textos principais, headings |
| Secundário | `text-secondary` | `#9ca3af` | Textos descritivos, subtítulos |
| Terciário | `text-tertiary` | `#6b7280` | Textos muito secundários, labels |

#### Cores de Accent

| Nome | Token | Valor | Uso |
|------|-------|-------|-----|
| Accent Principal | `accent` | `#2b7fff` | Buttons, links, highlights |
| Emphasis 1 (Verde) | `emphasis-1` | `#7ccf00` | Status sucesso, badges positivas |
| Emphasis 2 (Cyan) | `emphasis-2` | `#00bcff` | Status info, secundário |
| Emphasis 3 (Roxo) | `emphasis-3` | `#ad46ff` | Status especial, destaques |

### 2.2 Palette de Cores - Pickers (para Áreas/Plataformas)

| Nome | Hex | Uso |
|------|-----|-----|
| Red | `#e7000b` | Categorias, tags |
| Rose | `#ff637e` | Categorias, tags |
| Amber | `#e17100` | Categorias, tags |
| Purple | `#ad46ff` | Categorias, tags |
| Fuchsia | `#ed6bff` | Categorias, tags |
| Indigo | `#a3b3ff` | Categorias, tags |
| Blue | `#2b7fff` | Categorias, tags |
| Teal | `#00bba7` | Categorias, tags |
| Green | `#00c951` | Categorias, tags |
| Lime | `#7ccf00` | Categorias, tags |

### 2.3 Cores de Tags (com transparência)

Todas as cores de tags tem formato rgba com 40% de opacidade (66 em hex):

| Nome | Cor |
|------|-----|
| tag-red | `#85292d66` |
| tag-rose | `#8f515b66` |
| tag-amber | `#83562966` |
| tag-purple | `#6e458f66` |
| tag-fuchsia | `#88548f66` |
| tag-indigo | `#6a718f66` |
| tag-blue | `#3a5c8f66` |
| tag-teal | `#29746c66` |
| tag-green | `#29794966` |
| tag-lime | `#5b7c2966` |

### 2.4 Cores de Botões

#### Estados

| Nome | Token | Valor | Uso |
|------|-------|-------|-----|
| White | `btn-white` | `#fafafa` | Botão com fundo light |
| Black | `btn-black` | `#0a0a0a` | Botão com fundo dark |
| Logo Text | `logo-text` | `#fafafa` | Texto logo |

#### Botão Azul (Primário)

| Estado | Token | Valor |
|--------|-------|-------|
| Default | `btn-blue` | `#2b7fff` |
| Hover | `btn-blue-hover` | `#193cb8` |

#### Botão Verde (Sucesso)

| Estado | Token | Valor |
|--------|-------|-------|
| Default | `btn-green` | `#7ccf00` |
| Hover | `btn-green-hover` | `#008236` |

#### Botão Vermelho (Destruir)

| Estado | Token | Valor |
|--------|-------|-------|
| Default | `btn-red` | `#e7000b` |
| Hover | `btn-red-hover` | `#9f0712` |

#### Estados Standard/Inverse

| Token | Valor | Uso |
|-------|-------|-----|
| `btn-sta-std` | `#0a0a0a` | Button default standard |
| `btn-sta-inv` | `#fafafa` | Button default inverse |

---

## 3. TIPOGRAFIA

### 3.1 Font Stack

```css
/* Global font family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
```

### 3.2 Escala de Tamanho

Use a escala de Tailwind padrão com customizações:

| Elemento | Size | Weight | Line Height | Uso |
|----------|------|--------|-------------|-----|
| Heading 1 (H1) | 32px (2xl) | 700 | 1.2 | Título de páginas |
| Heading 2 (H2) | 24px (xl) | 700 | 1.25 | Subtítulos, seções |
| Heading 3 (H3) | 20px (lg) | 600 | 1.5 | Card titles |
| Body Large | 16px (base) | 400 | 1.5 | Textos principais |
| Body Small | 14px (sm) | 400 | 1.5 | Textos secundários |
| Label | 12px (xs) | 500 | 1 | Labels, badges |
| Caption | 11px (xs) | 400 | 1 | Hints, ajuda |

### 3.3 Pesos de Font

- 400: Regular (body text)
- 500: Medium (labels, subtítulos)
- 600: Semibold (headings pequenos)
- 700: Bold (headings principais)

---

## 4. ESPAÇAMENTO

Use a escala padrão do Tailwind (4px base):

| Valor | Pixels | Uso |
|-------|--------|-----|
| xs | 4px | Padding interno pequeno |
| sm | 8px | Gaps pequenos |
| md | 16px | Padding padrão |
| lg | 24px | Gaps entre seções |
| xl | 32px | Padding grande |
| 2xl | 40px | Gaps grandes entre blocos |

---

## 5. COMPONENTES SHADCN

### 5.1 Button

**Variantes:**

```typescript
// Primário (azul)
<Button>Entrar</Button>

// Secundário (outline)
<Button variant="outline">Cancelar</Button>

// Destrutivo (vermelho)
<Button variant="destructive">Deletar</Button>

// Ghost (sem fundo)
<Button variant="ghost">Link</Button>

// Loading
<Button disabled>
  <Loader className="animate-spin" />
  Carregando...
</Button>
```

**Tamanhos:**

```typescript
<Button size="sm">Pequeno</Button>
<Button size="default">Padrão</Button>
<Button size="lg">Grande</Button>
```

### 5.2 Input

**Estilos padrão:**

```typescript
<Input
  placeholder="Digite aqui"
  type="text"
  className="bg-accent border-border-accent"
/>

// Com ícone
<div className="relative">
  <Mail className="absolute left-3 top-3 text-text-secondary" size={18} />
  <Input className="pl-10" placeholder="Email" />
</div>
```

**Estados:**

- Default: `border-border-accent focus:ring-accent`
- Error: `border-red text-red`
- Disabled: `opacity-50 cursor-not-allowed`

### 5.3 Select

```typescript
<Select>
  <SelectTrigger className="bg-accent">
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Opção 1</SelectItem>
    <SelectItem value="opt2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

### 5.4 Card

```typescript
<Card className="bg-accent border-border-accent">
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

### 5.5 Modal/Dialog

```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título do Modal</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    {/* Conteúdo */}
  </DialogContent>
</Dialog>
```

### 5.6 Toast

```typescript
import { useToast } from "@/components/ui/use-toast"

const { toast } = useToast()

// Sucesso
toast({
  title: "Sucesso!",
  description: "Operação realizada",
  variant: "default"
})

// Erro
toast({
  title: "Erro!",
  description: "Algo deu errado",
  variant: "destructive"
})
```

---

## 6. ÍCONES (Lucide React)

### 6.1 Convenção de Uso

```typescript
// Importar ícones necessários
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  GripVertical
} from 'lucide-react'

// Usar com tamanho consistente
<Mail size={18} className="text-text-secondary" />

// Com cores
<CheckCircle size={20} className="text-emphasis-1" />

// Animações
<Loader size={20} className="animate-spin" />
```

### 6.2 Ícones por Contexto

| Contexto | Ícone | Tamanho | Cor |
|----------|-------|--------|-----|
| Nav Estudos | Clock | 20 | accent |
| Nav Áreas | Grid | 20 | accent |
| Nav Console | Settings | 20 | accent |
| Nav Usuário | User | 20 | accent |
| Drag Handle | GripVertical | 16 | text-secondary |
| Delete | Trash2 | 18 | btn-red |
| Edit | Edit | 18 | accent |
| Complete | CheckCircle | 18 | emphasis-1 |
| Error | AlertCircle | 18 | btn-red |
| Loading | Loader | 20 | accent |
| Email | Mail | 18 | accent |
| Password | Lock | 18 | accent |
| Toggle Visibility | Eye/EyeOff | 18 | text-secondary |

---

## 7. COMPONENTES CUSTOMIZADOS

### 7.1 MetricsCard

```typescript
interface MetricsCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  iconBgColor: string // 'bg-accent', 'bg-emphasis-1', etc
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  icon,
  iconBgColor
}) => {
  return (
    <Card className="bg-accent border-border-accent">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-text-secondary text-sm">{label}</p>
            <p className="text-text-primary text-3xl font-bold mt-2">
              {value}
            </p>
          </div>
          <div className={`${iconBgColor} p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

**Uso:**

```typescript
<MetricsCard
  label="Total de Aulas"
  value={342}
  icon={<BookOpen size={24} className="text-white" />}
  iconBgColor="bg-accent"
/>
```

### 7.2 AreaCard

```typescript
interface AreaCardProps {
  area: Area
  progress: number // 0-100
  totalAulas: number
  totalCursos: number
  cursosConcluidos: number
  onClick?: () => void
}

export const AreaCard: React.FC<AreaCardProps> = ({
  area,
  progress,
  totalAulas,
  totalCursos,
  cursosConcluidos,
  onClick
}) => {
  return (
    <Card
      className="bg-accent border-border-accent cursor-pointer hover:opacity-80 transition"
      onClick={onClick}
      style={{ borderTop: `4px solid ${area.color}` }}
    >
      <CardContent className="pt-6">
        <h3 className="text-text-primary font-semibold mb-4">
          {area.name}
        </h3>
        
        <div className="space-y-2 text-sm mb-4">
          <p className="text-text-secondary">
            Total de Aulas: <span className="text-text-primary">{totalAulas}</span>
          </p>
          <p className="text-text-secondary">
            Total de Cursos: <span className="text-text-primary">{totalCursos}</span>
          </p>
          <p className="text-text-secondary">
            Cursos concluídos: <span className="text-text-primary">{cursosConcluidos}</span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-xs">Progresso Geral</span>
            <span className="text-text-primary font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-progress-bar rounded-full h-2 overflow-hidden">
            <div
              className="h-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: area.color
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 7.3 ProgressChart (Tremor)

```typescript
import { DonutChart, Legend } from 'tremor'

interface ProgressChartProps {
  areas: Array<{ name: string; progress: number; color: string }>
  totalProgress: number
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  areas,
  totalProgress
}) => {
  const chartData = areas.map(area => ({
    name: area.name,
    value: area.progress
  }))

  return (
    <Card className="bg-accent border-border-accent">
      <CardHeader>
        <CardTitle>Progresso Geral</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart
          data={chartData}
          category="value"
          variant="donut"
          colors={areas.map(a => a.color)}
          showAnimation={true}
        />
        <div className="text-center mt-6">
          <p className="text-text-secondary text-sm">Progresso Total</p>
          <p className="text-text-primary text-4xl font-bold">
            {totalProgress}%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 7.4 DraggableList (com Drag-n-Drop)

```typescript
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

interface DraggableListProps {
  items: Array<{ id: string; name: string; color?: string }>
  onReorder: (items: typeof items) => void
  renderItem: (item: typeof items[0]) => React.ReactNode
}

export const DraggableList: React.FC<DraggableListProps> = ({
  items,
  onReorder,
  renderItem
}) => {
  const [orderedItems, setOrderedItems] = useState(items)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const activeIndex = orderedItems.findIndex(i => i.id === active.id)
      const overIndex = orderedItems.findIndex(i => i.id === over.id)

      const newItems = arrayMove(orderedItems, activeIndex, overIndex)
      setOrderedItems(newItems)
      onReorder(newItems)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedItems}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {orderedItems.map(item => (
            <div key={item.id}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
```

### 7.5 ActivityList

```typescript
interface ActivityItem {
  id: string
  type: 'lesson_completed' | 'course_added'
  title: string
  context: string
  timestamp: Date
}

interface ActivityListProps {
  activities: ActivityItem[]
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const getIcon = (type: ActivityItem['type']) => {
    if (type === 'lesson_completed') {
      return <CheckCircle size={18} className="text-emphasis-1" />
    }
    return <BookOpen size={18} className="text-emphasis-2" />
  }

  const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return 'há poucos segundos'
    if (seconds < 3600) return `há ${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `há ${Math.floor(seconds / 3600)}h`
    return `há ${Math.floor(seconds / 86400)}d`
  }

  return (
    <Card className="bg-accent border-border-accent">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex gap-3">
              {getIcon(activity.type)}
              <div className="flex-1">
                <p className="text-text-primary text-sm font-medium">
                  {activity.title}
                </p>
                <p className="text-text-secondary text-xs">
                  {activity.context}
                </p>
              </div>
              <p className="text-text-tertiary text-xs whitespace-nowrap">
                {getRelativeTime(activity.timestamp)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 8. LAYOUT E ESTRUTURA

### 8.1 Sidebar

**Largura:** 200-240px (expandable)
**Cores:**
- Background: `bg-accent`
- Texto ativo: `text-primary`
- Texto inativo: `text-secondary`
- Item ativo: `bg-drag-n-drop` com `text-accent`
- Border: `border-border-accent`

**Estrutura:**

```typescript
export const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 bg-accent border-r border-border-accent h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border-accent">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-logo-text">EduTracker</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Items */}
      </nav>

      {/* Plan Info */}
      <div className="border-t border-border-accent p-4 space-y-3">
        <div>
          <p className="text-text-secondary text-xs">Plano Free</p>
          <p className="text-text-primary font-semibold">
            <Badge variant="outline">FREE</Badge>
          </p>
        </div>
        <Button className="w-full bg-accent">Fazer upgrade</Button>
      </div>
    </aside>
  )
}
```

### 8.2 Header

**Altura:** 64px
**Cores:**
- Background: `bg-main`
- Border: `border-border-accent`
- Texto: `text-primary`

**Estrutura:**

```typescript
export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-main border-b border-border-accent flex items-center justify-between px-6">
      <div>
        <h1 className="text-text-primary text-lg font-semibold">
          Dashboard de Estudos
        </h1>
        <p className="text-text-secondary text-sm">
          Acompanhe seu progresso e estatísticas de aprendizado
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button variant="ghost" size="sm">
          <Sun className="hidden dark:block" />
          <Moon className="dark:hidden" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Avatar>
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
```

### 8.3 Grid de Cards

```typescript
{/* Grid responsivo: 1 col mobile, 2 col tablet, 3-4 col desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {areas.map(area => (
    <AreaCard key={area.id} area={area} {...props} />
  ))}
</div>
```

---

## 9. ESTADOS E TRANSIÇÕES

### 9.1 Loading State

```typescript
// Spinner
<div className="flex justify-center items-center py-8">
  <Loader size={32} className="animate-spin text-accent" />
</div>

// Skeleton (use Shadcn Skeleton)
import { Skeleton } from '@/components/ui/skeleton'

<div className="space-y-4">
  {[...Array(3)].map((_, i) => (
    <Skeleton key={i} className="h-24 bg-drag-n-drop" />
  ))}
</div>
```

### 9.2 Error State

```typescript
<div className="bg-tag-red text-btn-red p-4 rounded-lg flex gap-3">
  <AlertCircle size={20} className="flex-shrink-0" />
  <div>
    <h4 className="font-semibold">Erro ao carregar</h4>
    <p className="text-sm">{error.message}</p>
  </div>
</div>
```

### 9.3 Empty State

```typescript
<div className="text-center py-12">
  <BookOpen size={48} className="mx-auto text-text-tertiary mb-4" />
  <h3 className="text-text-primary font-semibold mb-2">Nenhuma área cadastrada</h3>
  <p className="text-text-secondary mb-6">
    Comece criando sua primeira área de estudo
  </p>
  <Button onClick={onCreateArea}>+ Criar Área</Button>
</div>
```

### 9.4 Transições

```typescript
// Fade in/out
<div className="transition-opacity duration-200 opacity-100 hover:opacity-80">
  {content}
</div>

// Height animation
<div className="max-h-0 overflow-hidden transition-all duration-300">
  {isOpen && <div className="max-h-96">{content}</div>}
</div>

// Transform
<div className="transform transition-transform duration-200 hover:scale-105">
  {content}
</div>
```

---

## 10. ACESSIBILIDADE

### 10.1 Contraste

**Todos os textos devem ter contraste mínimo 4.5:1**

```typescript
// ✅ Suficiente
<p className="text-text-primary">Texto principal</p> // #fafafa on #0a0a0a

// ❌ Insuficiente
<p className="text-text-tertiary">Texto importante</p> // #6b7280 on #0a0a0a
```

### 10.2 Labels e ARIA

```typescript
// ✅ Com label explícito
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Com aria-label
<button aria-label="Deletar item">
  <Trash2 size={18} />
</button>

// ✅ Com aria-describedby
<input
  id="password"
  type="password"
  aria-describedby="pwd-hint"
/>
<span id="pwd-hint" className="text-xs text-text-secondary">
  Mínimo 8 caracteres com letras e números
</span>
```

### 10.3 Focus States

```typescript
// Todos os botões e inputs precisam de focus visible
<button className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
  {text}
</button>

<input className="focus:outline-none focus:ring-2 focus:ring-accent" />
```

---

## 11. RESPONSIVIDADE

### 11.1 Breakpoints

Use breakpoints padrão do Tailwind:

| Breakpoint | Tamanho | Uso |
|-----------|---------|-----|
| sm | 640px | Smartphones grandes |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Desktops grandes |

### 11.2 Mobile First

```typescript
// ✅ Mobile first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 coluna por padrão, 2 em md, 3 em lg */}
</div>

// ✅ Sidebar colapsível em mobile
<aside className="hidden md:block w-60">
  {/* Sidebar */}
</aside>
```

---

## 12. MODO LIGHT (FUTURO)

Quando implementado, usar a paleta Light do tokens.json:

```typescript
// Cores Light
- bg-main: #f5f5f5
- bg-accent: #e4e4e7
- text-primary: #09090b
- text-secondary: #52525c
- accent: #193cb8
- emphasis-1: #7ccf00 (mantém)
```

**Implementação com Tailwind:**

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-accent': 'var(--bg-accent)',
        // ... outros
      }
    }
  }
}

// src/app/layout.tsx
<html className={isDarkMode ? 'dark' : ''}>
```

---

## 13. VARIAÇÕES DE COMPONENTES

### 13.1 Badge

```typescript
// Default
<Badge>Udemy</Badge>

// Variantes por plataforma
<Badge variant="purple">Udemy</Badge>
<Badge variant="blue">B7Web</Badge>
<Badge variant="red">YouTube</Badge>

// Com cor customizada
<Badge style={{ backgroundColor: platformColor }}>
  {platformName}
</Badge>
```

### 13.2 Progress Bar Customizada

```typescript
interface CustomProgressBarProps {
  progress: number // 0-100
  color: string // hex color
  showLabel?: boolean
}

export const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  progress,
  color,
  showLabel = true
}) => {
  return (
    <div className="space-y-2">
      <div className="w-full bg-progress-bar rounded-full h-2 overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: color
          }}
        />
      </div>
      {showLabel && (
        <p className="text-text-secondary text-xs">
          {progress.toFixed(1)}% concluído
        </p>
      )}
    </div>
  )
}
```

---

## 14. VARIÁVEIS CSS GLOBAIS

Crie arquivo de CSS variables para fácil manutenção:

```css
/* src/styles/globals.css */

:root {
  /* Dark Theme (padrão) */
  --bg-main: #0a0a0a;
  --bg-accent: #18181b;
  --drag-n-drop: #27272a;
  --progress-bar: #1e2939;
  --border-accent: #314158;
  
  --text-primary: #fafafa;
  --text-secondary: #9ca3af;
  --text-tertiary: #6b7280;
  
  --accent: #2b7fff;
  --emphasis-1: #7ccf00;
  --emphasis-2: #00bcff;
  --emphasis-3: #ad46ff;
  
  /* Picker Colors */
  --picker-red: #e7000b;
  --picker-rose: #ff637e;
  --picker-amber: #e17100;
  --picker-purple: #ad46ff;
  --picker-fuchsia: #ed6bff;
  --picker-indigo: #a3b3ff;
  --picker-blue: #2b7fff;
  --picker-teal: #00bba7;
  --picker-green: #00c951;
  --picker-lime: #7ccf00;
}

html.light {
  /* Light Theme */
  --bg-main: #f5f5f5;
  --bg-accent: #e4e4e7;
  /* ... resto das cores light */
}
```

---

## 15. GUIA DE CORES PARA DRAG-N-DROP

### 15.1 Visual Feedback

```typescript
// Item sendo arrastado
className="opacity-50"

// Area de drop ativa
className="bg-drag-n-drop border-2 border-accent"

// Item sobre area de drop
className="transform scale-105"
```

### 15.2 Persistência de Cores

As cores das áreas e plataformas devem ser armazenadas e exibidas consistentemente:

```typescript
// Ao listar áreas com drag-n-drop
{areas.map(area => (
  <DraggableItem
    key={area.id}
    item={area}
    style={{ borderTop: `3px solid ${area.color}` }}
  >
    <Badge style={{ backgroundColor: area.color }}>
      {area.name}
    </Badge>
  </DraggableItem>
))}
```

---

## 16. CHECKLIST DE DESIGN

Antes de entregar um componente:

- [ ] Cores corretas do tokens.json (Dark theme)
- [ ] Tipografia: tamanho e peso corretos
- [ ] Espaçamento: consistente com escala
- [ ] Ícones: tamanho 18-20px, cor apropriada
- [ ] Estados: hover, focus, active, disabled
- [ ] Loading state: animação de loading
- [ ] Error state: mensagem clara
- [ ] Empty state: mensagem amigável
- [ ] Acessibilidade: contraste, labels, focus
- [ ] Responsividade: testado em mobile/tablet/desktop
- [ ] Transições: suaves, <300ms
- [ ] ShadCN: usando componentes base quando possível

---

**Versão:** 1.0
**Último Update:** Outubro 2025
**Tema Padrão:** Dark
**Próximo:** Implementar tema Light
