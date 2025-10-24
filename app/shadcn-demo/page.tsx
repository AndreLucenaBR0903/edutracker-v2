"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ShadcnDemoPage() {
  const [theme, setTheme] = useState<string>("system")
  const [selectValue, setSelectValue] = useState<string>("apple")

  return (
    <div className="container mx-auto max-w-3xl p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">shadcn/ui demo</h1>
        <Link href="/" className="text-sm underline">Voltar</Link>
      </div>

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Button
          onClick={() => toast.success("Olá! Sonner integrado com Toaster no layout.")}
        >
          Disparar Toast
        </Button>
      </div>

      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Menu</TabsTrigger>
          <TabsTrigger value="tab2">Dialog</TabsTrigger>
          <TabsTrigger value="tab3">Select</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Abrir menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Exemplos</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast("Item clicado")}>Item padrão <DropdownMenuShortcut>⌘I</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuCheckboxItem checked>Checkbox</DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Sub item 1</DropdownMenuItem>
                    <DropdownMenuItem>Sub item 2</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsContent>
        <TabsContent value="tab2" className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Abrir dialog</Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog de exemplo</DialogTitle>
                  <DialogDescription>
                    Este é um conteúdo do dialog. Feche com o botão abaixo.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Fechar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </TabsContent>
        <TabsContent value="tab3" className="space-y-4">
          <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger aria-label="Frutas">
              <SelectValue placeholder="Escolha uma fruta" />
            </SelectTrigger>
            <SelectContent>
              <SelectScrollUpButton />
              <SelectLabel>Frutas</SelectLabel>
              <SelectItem value="apple">Maçã</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Laranja</SelectItem>
              <SelectSeparator />
              <SelectItem value="grape">Uva</SelectItem>
              <SelectScrollDownButton />
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Selecionado: {selectValue}</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}