'use client'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

export function SearchInput() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    router.push(`?search=${search}`)
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
          value={search}
          onChange={e => setSearch(e.target.value)}
          className=" w-full rounded-md border border-input bg-background py-1.5 pr-3 pl-10 text-foreground ring-offset-foreground sm:text-sm sm:leading-6"
          placeholder="Nome da receita"
          type="search"
        />
      </div>
    </form>
  )
}
