import { HeaderMain } from '@/components/header-main'
import { RecipeButtonsGroups } from '@/components/recipe-buttons-groups'
import { getRecipes } from '@/data/api'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const type = (await searchParams).type || 'breakfast'
  const search = (await searchParams).search || undefined
  const isSearch = search ? 'search' : type
  const data = await getRecipes(type as string, 1, 8, search as string)

  return (
    <main className="mt-6 flex w-full flex-col items-center">
      <div className="w-full max-w-screen-lg px-4 lg:px-8">
        <HeaderMain type={isSearch as string} />
        <RecipeButtonsGroups type={isSearch as string} />
        {data[0].nome}
      </div>
    </main>
  )
}
