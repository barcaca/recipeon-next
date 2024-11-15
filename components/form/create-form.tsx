'use client'
import { createRecipe } from '@/actions/receita/criar'
import { CreateRecipeSchema, type TCreateRecipeData } from '@/actions/receita/criar/schema'
import { InputCategorias } from '@/components/input-categorias'
import { InputFile } from '@/components/input-file'
import { InputIngredients } from '@/components/input-ingredients'
import { InputSteps } from '@/components/input-steps'
import { InputText } from '@/components/input-text'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { customToast } from '@/lib/custom-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlarmClockIcon,
  BookOpenTextIcon,
  EraserIcon,
  InfoIcon,
  SaveIcon,
  User2Icon,
} from 'lucide-react'
import { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function CreateForm() {
  const [formState, formAction, isPending] = useActionState(createRecipe, undefined)
  const form = useForm<TCreateRecipeData>({
    resolver: zodResolver(CreateRecipeSchema),
    defaultValues: {
      nome: '',
      imagem: undefined,
      serve: '' as unknown as number,
      tempo: '' as unknown as number,
      descricao: '',
      categoria: [],
      ingredientes: [{ quantidade: '', unidade: undefined, nome: '' }],
      passos: [''],
    },
  })

  const { reset } = form

  function onSubmit(formData: TCreateRecipeData) {
    startTransition(() => formAction(formData))
  }

  useEffect(() => {
    if (formState) {
      customToast(formState)
      formState.status < 400 && reset()
    }
  }, [formState, reset])

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        id="recipe-form"
        name="recipe-form"
        className="relative flex w-full flex-col gap-5 md:h-[660px] md:flex-row"
      >
        <FormDetails />
        <FormSteps />
        <div className="-top-16 absolute right-0 flex gap-2">
          <Button type="submit" form="recipe-form" className="" disabled={isPending}>
            <SaveIcon size={20} /> Salvar Receita
          </Button>
          <Button
            type="reset"
            form="recipe-form"
            className=""
            disabled={isPending}
            variant={'destructive'}
            onClick={() => form.reset()}
          >
            <EraserIcon size={20} />
            Limpar Campos
          </Button>
        </div>
      </form>
    </Form>
  )
}

function FormDetails() {
  return (
    <Card className="flex h-full w-full flex-col gap-2 overflow-x-hidden shadow-shape lg:max-w-[450px]">
      <CardHeader className="sticky top-0 z-20 w-fit rounded-br-xl bg-primary px-3 py-3 text-primary-foreground">
        <CardTitle className="font-heading">Detalhes da Receita</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-2 p-3 font-body has-[label]:font-heading sm:p-6">
        <InputFile />
        <InputText icon={BookOpenTextIcon} label="Nome" name="nome" placeholder="Nome da Receita" />
        <div className="flex gap-2">
          <InputText
            icon={User2Icon}
            type="number"
            label="Serve"
            name="serve"
            placeholder="1, 2, 3..."
          />
          <InputText
            icon={AlarmClockIcon}
            type="number"
            label="Tempo"
            name="tempo"
            placeholder="em minutos..."
          />
        </div>
        <InputCategorias />
        <InputText
          icon={InfoIcon}
          type="textarea"
          label="Descrição"
          name="descricao"
          placeholder="Descrição da Receita"
        />
      </CardContent>
    </Card>
  )
}

function FormSteps() {
  return (
    <Card className="flex h-full w-full flex-col gap-2 overflow-x-hidden shadow-shape">
      <CardHeader className="sticky top-0 z-20 w-fit rounded-br-xl bg-primary px-3 py-3 text-primary-foreground">
        <CardTitle className="font-heading">Instruções</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-2 p-3 font-body has-[label]:font-heading sm:p-6">
        <InputIngredients />
        <InputSteps />
      </CardContent>
    </Card>
  )
}
