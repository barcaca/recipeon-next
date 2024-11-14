import { ErrorTooltip } from '@/components/error-tooltip'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PlusIcon, SproutIcon, Trash2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const unidades = [
  {
    categoria: 'Volume',
    valores: ['mililitros', 'litros', 'colher de chá', 'colher de sopa', 'xícara', 'copo', 'gota'],
  },
  {
    categoria: 'Peso',
    valores: ['gramas', 'quilogramas'],
  },
  {
    categoria: 'Unidades',
    valores: ['unidade', 'dente', 'folha', 'punhado'],
  },
  {
    categoria: 'Pacotes',
    valores: ['pacote', 'caixa', 'lata', 'garrafa'],
  },
] as const

export function InputIngredients() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'ingredientes' })

  useEffect(() => {
    if (fields.length === 0) {
      append({ ingrediente: '', quantidade: '', unidade: '' })
    }
  }, [fields, append])

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <h3 className="flex items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        <SproutIcon size={16} />
        Ingredientes
      </h3>
      <div className="relative flex flex-col overflow-y-scroll">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 p-1">
            <div className="flex">
              <FormField
                control={control}
                name={`ingredientes.${index}.quantidade` as const}
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel className="ml-1">Qts</FormLabel>
                    <FormControl>
                      <Input
                        className="-me-px max-w-20 rounded-e-none shadow-none focus-visible:z-10"
                        {...field}
                        placeholder="1, 1/2,..."
                      />
                    </FormControl>
                    <ErrorTooltip fieldState={fieldState} />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`ingredientes.${index}.unidade` as const}
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel className="ml-1">Unidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                    >
                      <FormControl className="text-xs">
                        <SelectTrigger className="h-10 w-32 rounded-none rounded-e-lg">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-32">
                        {unidades.map(unidade => (
                          <SelectGroup key={unidade.categoria}>
                            {unidade.categoria !== 'Volume' && <SelectSeparator />}
                            <SelectLabel className="p-0 text-base">{unidade.categoria}</SelectLabel>
                            {unidade.valores.map(item => (
                              <SelectItem key={item} value={item} className="text-sm">
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorTooltip fieldState={fieldState} />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name={`ingredientes.${index}.nome` as const}
              render={({ field, fieldState }) => (
                <FormItem className="relative flex-1">
                  <FormLabel className="ml-1">Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do ingrediente" />
                  </FormControl>
                  <ErrorTooltip fieldState={fieldState} />
                </FormItem>
              )}
            />
            <Button
              className="mt-6"
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2Icon size={16} />
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="w-full"
        type="button"
        variant="terciary"
        onClick={() => append({ quantidade: '', unidade: '', nome: '' })}
      >
        <PlusIcon size={16} /> Novo Ingrediente
      </Button>
    </div>
  )
}
