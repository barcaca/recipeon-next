import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { TReceita } from '@/types/recipe'
import { BookTextIcon, ClockIcon, Sprout, Trash2Icon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'

export function RecipeCard({ receita }: { receita: TReceita }) {
  return (
    <Card className="flex h-auto flex-col overflow-visible text-foreground shadow-md ">
      <div className="flex h-auto w-full flex-auto flex-col gap-4 overflow-visible break-words p-3 text-left subpixel-antialiased md:flex-row md:items-center">
        <div className="w-full max-w-52 self-center overflow-visible">
          <Image
            src={receita.imagem}
            alt={receita.nome}
            width={192}
            height={154}
            className="aspect-[5/4] h-full w-full object-cover"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-center">
          <CardHeader className="flex flex-wrap items-baseline p-0">
            <CardTitle className="w-full text-lg">{receita.nome}</CardTitle>
          </CardHeader>
          <CardContent className="my-4 flex flex-col gap-2 p-0 font-body">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-sm">
                <ClockIcon className="size-4 text-card-foreground" /> {receita.tempo} min
              </span>
              <span className="inline-flex items-center gap-1 text-sm">
                <UserIcon className="size-4 text-card-foreground" /> {receita.serve}
              </span>
              <span className="inline-flex items-center gap-1 text-sm">
                <Sprout className="size-4 text-card-foreground" /> {receita.ingredientes.length + 1}{' '}
                Ingridentes
              </span>
            </div>
          </CardContent>
          <CardFooter className="justify-between gap-1 p-0">
            <Button>
              <BookTextIcon className="size-4 text-inherit" />
              Receita
            </Button>
            <Button variant={'destructive'} size={'icon'}>
              <Trash2Icon className="size-4 text-inherit" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
