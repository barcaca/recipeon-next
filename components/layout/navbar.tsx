import { SearchInput } from '@/components/search-input'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import Logo from '@/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-40 flex h-auto w-full items-center justify-center bg-primary shadow">
      <header className="flex h-16 w-full max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Recipeon logo" className="size-8" />
          <p className="hidden font-bold font-cinzel text-primary-foreground sm:block">RecipeoN</p>
        </Link>
        <Suspense>
          <SearchInput />
        </Suspense>
        <ThemeToggle />
      </header>
    </nav>
  )
}
