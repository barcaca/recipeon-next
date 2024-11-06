import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function RecipeCardSkeleton() {
  return (
    <Skeleton className="flex h-auto flex-col overflow-visible text-foreground shadow-md">
      <div className="flex h-auto w-full flex-auto flex-col gap-4 overflow-visible break-words p-3 text-left subpixel-antialiased md:flex-row md:items-center">
        <div className="w-full max-w-52 self-center overflow-visible">
          <Skeleton className="aspect-[5/4] h-full w-full object-cover" />
        </div>
        <div className="flex h-full w-full flex-col justify-center">
          <CardHeader className="flex flex-wrap items-baseline p-0">
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="my-4 flex flex-col gap-2 p-0 font-body">
            <div className="flex flex-wrap justify-between gap-2">
              <Skeleton className="inline-flex h-4 w-10" />
              <Skeleton className="inline-flex h-4 w-6" />
              <Skeleton className="inline-flex h-4 w-16" />
            </div>
          </CardContent>
          <CardFooter className="justify-between gap-1 p-0">
            <Skeleton className="inline-flex h-4 w-16" />
            <Skeleton className="inline-flex h-4 w-16" />
          </CardFooter>
        </div>
      </div>
    </Skeleton>
  )
}
