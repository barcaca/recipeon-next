import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { HeadersTitles } from '@/types/recipe'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export const headerTitles: HeadersTitles = {
  breakfast: {
    id: 'Café da Manhã',
    title: 'Receitas matinais',
  },
  lunch: {
    id: 'Almoço',
    title: 'Pratos para o almoço',
  },
  dinner: {
    id: 'Jantar',
    title: 'Ideias para o jantar',
  },

  dessert: {
    id: 'Sobremesa',
    title: 'Doces para saborear',
  },

  snack: {
    id: 'Lanche',
    title: 'Snacks rápidos',
  },
  drink: {
    id: 'Bebida',
    title: 'Bebidas variadas',
  },
  search: {
    id: 'Busca',
    title: 'Resultados da busca',
  },
}

export function HeaderMain({ type }: { type: string }) {
  return (
    <header className="mb-6 flex w-full items-center justify-between">
      <div className="flex flex-col">
        <h1 className="font-bold text-default-900 text-xl lg:text-3xl">{headerTitles[type].id}</h1>
        <p className="text-default-400 text-small lg:text-medium">{headerTitles[type].title}</p>
      </div>
      <Link href={'/nova-receita'} className={cn(buttonVariants({ variant: 'default' }))}>
        <PlusIcon />
        Nova receita
      </Link>
    </header>
  )
}
