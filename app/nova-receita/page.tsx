import { CreateForm } from '@/components/form/create-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function NovaReceita() {
  return (
    <main className="my-6 flex w-full flex-col items-center ">
      <div className="w-full max-w-screen-xl space-y-6 px-4 sm:px-6">
        <header className="flex w-full items-center justify-between">
          <div>
            <Link href={'/'} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
              <ChevronLeftIcon size={16} /> Voltar
            </Link>
            <h1 className="font-heading font-semibold text-xl sm:text-3xl">Crie sua Receita</h1>
          </div>
        </header>
        <CreateForm />
      </div>
    </main>
  )
}
