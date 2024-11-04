import { HeaderMain } from '@/components/header-main'
import { RecipeButtonsGroups } from '@/components/recipe-buttons-groups'
import { RecipeCard } from '@/components/recipe-card'
import { getRecipes } from '@/data/api'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const type = (await searchParams).type || 'breakfast'
  const search = (await searchParams).search || undefined
  const isSearch = search ? 'search' : type
  const receitas = await getRecipes(type as string, 1, 8, search as string)

  return (
    <main className="my-6 flex w-full flex-col items-center">
      <div className="w-full max-w-screen-lg space-y-6 px-4 sm:px-6">
        <HeaderMain type={isSearch as string} />
        <RecipeButtonsGroups type={isSearch as string} />
        <div className="grid grid-cols-1 gap-2 min-[550px]:grid-cols-2">
          {receitas.map(receita => (
            <RecipeCard key={receita.id} receita={receita} />
          ))}
        </div>
      </div>
    </main>
  )
}
