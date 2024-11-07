import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import notFound from '@/public/not-found.png'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-11rem)] items-center sm:min-h-[calc(100vh-8rem)]">
      <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-8">
        <Image className="w-[600px] " src={notFound} alt="prato vazio com numero 404" />
        <p className="text-muted-foreground">Ops! Parece que perdemos essa receita... 🍴</p>
        <Link href="/" className={cn(buttonVariants({ variant: 'default' }), 'text-lg uppercase')}>
          Retorna Home
        </Link>
      </div>
    </div>
  )
}
