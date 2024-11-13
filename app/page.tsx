import { HeaderMain } from '@/components/header-main'
import { RecipeButtonsGroups } from '@/components/recipe-buttons-groups'
import { RecipeCard } from '@/components/recipe-card'
import { RecipePagination } from '@/components/recipe-pagination'
import { RecipeCardSkeleton } from '@/components/skeleton/recipe-card-skeleton'
import { getRecipes } from '@/data/api'
import { Suspense } from 'react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const type = (await searchParams).type || 'breakfast'
  const search = (await searchParams).search || undefined
  const page = Number((await searchParams).page) || 1
  const limit = 8
  const isSearch = search ? 'search' : type
  const { recipes, totalRecipes } = await getRecipes(type as string, page, limit, search as string)
  const totalPages = Math.ceil(totalRecipes / limit)

  return (
    <main className="my-6 flex w-full flex-col items-center">
      <div className="w-full max-w-screen-xl space-y-6 px-4 sm:px-6">
        <HeaderMain type={isSearch as string} />
        <RecipeButtonsGroups type={isSearch as string} />
        <div className="grid grid-cols-1 gap-2 min-[550px]:grid-cols-2">
          {recipes.map(receita => (
            <Suspense key={receita.id} fallback={<RecipeCardSkeleton />}>
              <RecipeCard receita={receita} />
            </Suspense>
          ))}
        </div>
        <RecipePagination
          page={page}
          totalPage={totalPages}
          search={search as string}
          type={type as string}
        />
      </div>
    </main>
  )
}
