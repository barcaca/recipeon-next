import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { TReceita } from '@/types/recipe'
import { BookTextIcon, ClockIcon, Sprout, UserIcon } from 'lucide-react'
import Image from 'next/image'

export function RecipeDialogView({ receita }: { receita: TReceita }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BookTextIcon className="size-4 text-inherit" />
          Receita
        </Button>
      </DialogTrigger>
      <DialogContent
        closePosition="top-left"
        className="top-16 flex min-h-[615px] flex-col sm:top-0 "
      >
        <DialogHeader className="relative h-fit flex-row text-left">
          <div className="h-auto w-full space-y-3">
            <DialogTitle className="flex w-60 items-center gap-2 font-heading font-semibold text-2xl text-primary sm:text-3xl">
              {receita.nome}
            </DialogTitle>
            <div className="flex w-60 flex-wrap justify-between gap-2">
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
            <DialogDescription>{receita.descricao}</DialogDescription>
          </div>
          <div className="xs:-top-40 -top-44 -right-20 xs:-right-24 absolute h-[207px] xs:h-[227px] w-[220px] xs:w-[240px] overflow-visible sm:h-[277px] sm:w-[290px]">
            <Image
              src={receita.imagem}
              alt={receita.nome}
              width={290}
              height={277}
              className="aspect-[5/4] h-full w-full object-contain "
            />
          </div>
        </DialogHeader>
        <DialogFooter className="h-full w-full flex-1">
          <Tabs className="w-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="ingrediente">
                Ingredientes
              </TabsTrigger>
              <TabsTrigger className="w-full" value="preparo">
                Preparo
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ingrediente" className="p-1 ">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="py-3.5 pr-3 pl-4 text-left font-semibold text-card-foreground text-sm sm:pl-3">
                      Nome
                    </th>
                    <th className="px-3 py-3.5 text-right font-semibold text-card-foreground text-sm">
                      Qts
                    </th>
                    <th className="px-3 py-3.5 text-right font-semibold text-card-foreground text-sm">
                      Unidade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receita.ingredientes.map(item => (
                    <tr key={item.nome} className="even:bg-muted/50">
                      <td className="w-full py-4 pr-3 pl-4 font-medium text-card-foreground text-sm sm:pl-3">
                        {item.nome}
                      </td>
                      <td className="px-3 py-4 text-right text-muted-foreground text-sm">
                        {item.quantidade}
                      </td>
                      <td className="text-nowrap px-3 py-4 text-right text-muted-foreground text-sm">
                        {item.unidade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="preparo" className="p-1 ">
              <ul className="divide-y divide-border">
                {receita.passos.map((step, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <li key={i} className="flex items-center gap-x-4 py-5">
                    <span className="font-heading">{(i + 1).toString().padStart(2, '0')}</span>
                    <p className="font-body text-muted-foreground text-sm ">{step}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
