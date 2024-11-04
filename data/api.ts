'use server'
import type { TReceita } from '@/types/recipe'
import { unstable_noStore as noStore } from 'next/cache'
import { BASE_URL } from './base'

/**
 * Fetches recipes based on type, page, limit, and optional search query.
 *
 * @param {string} type - The category of recipes to fetch.
 * @param {number} page - The page number for pagination.
 * @param {number} [limit=8] - The number of recipes per page.
 * @param {string} [search] - The search term to filter recipes by name.
 * @returns {Promise<TReceita[]>} - A promise that resolves to an array of recipes.
 */
async function fetchRecipes(
  type: string,
  page = 1,
  limit = 8,
  search?: string
): Promise<TReceita[]> {
  noStore()
  const url = search
    ? `${BASE_URL.REST}?nome_like=${search}`
    : `${BASE_URL.REST}?categoria_like=${type}&_page=${page}&_limit=${limit}`

  const response = await fetch(url)
  const data: TReceita[] = await response.json()

  return data
}

export const getRecipes = fetchRecipes
