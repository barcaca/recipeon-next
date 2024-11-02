import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const buttons = [
  { id: 'breakfast', title: 'Café da Manhã' },
  { id: 'lunch', title: 'Almoço' },
  { id: 'dinner', title: 'Jantar' },
  { id: 'dessert', title: 'Sobremesa' },
  { id: 'snack', title: 'Lanche' },
  { id: 'drink', title: 'Bebida' },
]

export function RecipeButtonsGroups({ type }: { type: string }) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto py-2">
      {buttons.map(button => {
        const isSelected = button.id === type
        return (
          <Link
            key={button.id}
            href={{
              query: {
                type: `${button.id}`,
              },
            }}
            type="button"
            className={cn(
              buttonVariants({
                variant: `${isSelected ? 'default' : 'ghost'}`,
              })
            )}
          >
            {button.title}
          </Link>
        )
      })}
    </div>
  )
}
