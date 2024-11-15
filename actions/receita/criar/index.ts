'use server'

import { createRecipeApi, uploadImageApi } from '@/data/api'
import { revalidatePath } from 'next/cache'
import {
  CreateRecipeSchema,
  type TCreateRecipeData,
  type TCreateRecipeDataAfterValidation,
} from './schema'

export async function createRecipe(prevState: unknown, formData: TCreateRecipeData) {
  const validation = CreateRecipeSchema.safeParse(formData)
  if (!validation.success) {
    return {
      message: validation.error.message,
      status: 400,
    }
  }

  const validData = validation.data

  try {
    const imageUrl = await uploadImageApi(validData.imagem)

    if (!imageUrl) {
      return {
        message: 'Ocorreu um erro ao enviar a imagem',
        status: 500,
      }
    }
    const data: TCreateRecipeDataAfterValidation = {
      ...validData,
      imagem: imageUrl as string,
    }

    const response = await createRecipeApi(data)

    if (!response) {
      return {
        message: 'Ocorreu um erro ao criar a receita',
        status: 500,
      }
    }

    revalidatePath('/')
    return {
      message: 'Receita criada com sucesso',
      status: 200,
    }
  } catch (error) {
    return {
      message: 'Ocorreu um erro',
      status: 500,
    }
  }
}
