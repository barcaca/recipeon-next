'use client'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ChangeEvent, FormEvent } from 'react'

export function SearchInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault() // Previne o envio do formulário
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchString = e.currentTarget.value
    const params = new URLSearchParams()

    if (searchString) {
      // Atualiza o parâmetro 'search' na URL se houver texto no campo
      params.set('search', searchString)
    } else {
      // Remove o parâmetro 'search' se o campo estiver vazio
      params.delete('search')
    }

    // Atualiza a URL com os parâmetros atuais
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="size-6 text-foreground" aria-hidden="true" />
        </div>
        <Input
          id="search"
          name="search"
          type="search"
          onChange={handleChange}
          className=" w-full rounded-md border border-input bg-background py-1.5 pr-3 pl-10 text-foreground ring-offset-foreground sm:text-sm sm:leading-6"
          placeholder="Nome da receita"
        />
      </div>
    </form>
  )
}
