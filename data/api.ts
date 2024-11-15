'use server'
import type { TCreateRecipeDataAfterValidation } from '@/actions/receita/criar/schema'
import type { TReceita } from '@/types/recipe'
import { unstable_noStore as noStore } from 'next/cache'
import { APIKEY, BASE_URL } from './base'

/**
 * Fetches recipes based on type, page, limit, and optional search query.
 *
 * @param {string} type - The category of recipes to fetch.
 * @param {number} page - The page number for pagination.
 * @param {number} [limit=8] - The number of recipes per page.
 * @param {string} [search] - The search term to filter recipes by name.
 * @returns {Promise<{ recipes: TReceita[]; totalRecipes: number }>} - A promise that resolves to an object containing an array of recipes and the total number of recipes.
 */
async function fetchRecipes(
  type: string,
  page = 1,
  limit = 8,
  search?: string
): Promise<{ recipes: TReceita[]; totalRecipes: number }> {
  noStore()
  const url = search
    ? `${BASE_URL.REST}?nome_like=${search}&_page=${page}&_limit=${limit}`
    : `${BASE_URL.REST}?categoria_like=${type}&_page=${page}&_limit=${limit}`

  const response = await fetch(url)
  const recipes: TReceita[] = await response.json()

  const totalRecipes = Number.parseInt(response.headers.get('X-Total-Count') || '0', 10)

  return { recipes, totalRecipes }
}

export const getRecipes = fetchRecipes

async function createRecipe(formData: TCreateRecipeDataAfterValidation): Promise<boolean> {
  const apiUrl = `${BASE_URL.REST}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }

  try {
    const response = await fetch(apiUrl, options)

    if (!response.ok) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const createRecipeApi = createRecipe

async function uploadImage(imageFile: File): Promise<string | false> {
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${APIKEY}`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      return false
    }
    const { data } = await response.json()

    return data.url
  } catch {
    return false
  }
}

export const uploadImageApi = uploadImage
