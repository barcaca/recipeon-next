'use server'

import { BASE_URL } from '@/data/base'
import { revalidatePath } from 'next/cache'

export async function deleteRecipe(prevState: unknown, id: number) {
  try {
    const response = await fetch(`${BASE_URL.REST}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status >= 400) {
      return {
        message: response.statusText,
        status: response.status,
      }
    }

    revalidatePath('/')
    return {
      message: 'Receita deletada com sucesso',
      status: 200,
    }
  } catch (error) {
    return {
      message: error ? `${error}` : 'Ocorreu um erro ao deletar a receita',
      status: 500,
    }
  }
}
