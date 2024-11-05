import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="h-16 w-full bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-2 p-6 sm:flex-row sm:py-3">
        <p className="order-2 font-sans text-muted-foreground text-sm sm:order-1">
          © 2024 Luan Barcaça. Alura Desafio
        </p>
        <div className="order-1 flex items-center gap-2 sm:order-2">
          <Link
            href="https://github.com/barcaca/recipeon-next"
            className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
            target="_blank"
          >
            <Icons.gitHub className="size-6 fill-foreground" />
          </Link>
          <Link
            href="'https://www.linkedin.com/in/luan-barcaça/'"
            className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
            target="_blank"
          >
            <Icons.linkedin className="size-6 fill-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
