'use client'

import { deleteRecipe } from '@/actions/receita/deletar'
import { Button } from '@/components/ui/button'
import { customToast } from '@/lib/custom-toast'
import { startTransition, useActionState, useEffect } from 'react'

interface DeleteFormProps {
  id: number
  onDelete: () => void
}

export function DeleteForm({ id, onDelete }: DeleteFormProps) {
  const [formState, formAction, isPending] = useActionState(deleteRecipe, undefined)

  useEffect(() => {
    if (formState) {
      customToast(formState)
    }
  }, [formState])

  return (
    <Button
      type="button"
      onClick={() => {
        startTransition(() => {
          formAction(id)
        })
        onDelete()
      }}
      variant={'destructive'}
      disabled={isPending}
    >
      Deletar
      {formState?.message}
      {formState?.status}
    </Button>
  )
}
