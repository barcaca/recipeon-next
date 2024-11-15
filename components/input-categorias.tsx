import { ErrorTooltip } from '@/components/error-tooltip'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { TagsIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const categorias = [
  {
    id: 'breakfast',
    label: 'Café da Manhã',
  },
  {
    id: 'lunch',
    label: 'Almoço',
  },
  {
    id: 'dinner',
    label: 'Jantar',
  },
  {
    id: 'dessert',
    label: 'Sobremesa',
  },
  {
    id: 'snack',
    label: 'Lanche',
  },
  {
    id: 'drink',
    label: 'Bebida',
  },
] as const

export function InputCategorias() {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name="categoria"
      render={({ fieldState }) => (
        <FormItem className="relative">
          <FormLabel asChild>
            <div className="flex items-center gap-2">
              <TagsIcon size={16} /> Categorias
            </div>
          </FormLabel>
          <div className="flex flex-wrap gap-2">
            {categorias.map(item => (
              <FormField
                key={item.id}
                control={control}
                name="categoria"
                render={({ field }) => {
                  return (
                    <FormItem key={item.id} className="flex items-center space-y-0">
                      <FormControl>
                        <Checkbox
                          name={field.name}
                          value={item.id}
                          className="peer hidden"
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={checked => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter((value: string) => value !== item.id)
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="rounded-full border border-border bg-muted px-3 py-2 text-muted-foreground text-xs peer-aria-checked:border-primary peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <ErrorTooltip fieldState={fieldState} />
        </FormItem>
      )}
    />
  )
}
