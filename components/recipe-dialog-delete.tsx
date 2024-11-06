'use client'
import { DeleteForm } from '@/components/form/delete-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2Icon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

export function RecipeDialogDelete({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'destructive'} size={'icon'}>
          <Trash2Icon className="size-4 text-inherit" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrashIcon className="size-4 text-destructive" /> Deseja excluir a receita
          </DialogTitle>
          <DialogDescription>Tem certeza? Essa ação não pode ser desfeita.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'outline'}>
              Cancelar
            </Button>
          </DialogClose>
          <DeleteForm id={id} onDelete={() => setOpen(false)} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
