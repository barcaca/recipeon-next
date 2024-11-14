import { ErrorTooltip } from '@/components/error-tooltip'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { ListOrderedIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export function InputSteps() {
  const { control, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'passos' })

  useEffect(() => {
    if (fields.length === 0) {
      setValue('passos', [''])
    }
  }, [fields, setValue])

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <h3 className="flex items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        <ListOrderedIcon size={16} />
        Passos
      </h3>
      <div className="relative flex flex-col overflow-y-scroll">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 p-1">
            <FormField
              control={control}
              name={`passos.${index}` as const}
              render={({ field, fieldState }) => (
                <FormItem className="flex w-full items-center gap-2">
                  <FormLabel className="ml-1">{(index + 1).toString().padStart(2, '0')}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      rows={1}
                      {...field}
                      placeholder="Descrição do passo"
                    />
                  </FormControl>
                  <Button
                    className=""
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2Icon size={16} />
                  </Button>
                  <ErrorTooltip fieldState={fieldState} side="left" />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
      <Button className="w-full" type="button" variant="terciary" onClick={() => append('')}>
        <PlusIcon size={16} /> Novo passo
      </Button>
    </div>
  )
}
