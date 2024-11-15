import { z } from 'zod'

const MAX_FILE_SIZE = 3000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const UNIDADES = [
  'mililitros',
  'litros',
  'colher de chá',
  'colher de sopa',
  'xícara',
  'copo',
  'gota',
  'gramas',
  'quilogramas',
  'unidade',
  'dente',
  'folha',
  'punhado',
  'pacote',
  'caixa',
  'lata',
  'garrafa',
] as const

const ingredientesSchema = z.object({
  quantidade: z
    .string()
    .regex(/^\d+(\/\d+)?$/, {
      message: 'A quantidade deve ser um número ou números separados por "/".',
    })
    .min(1, { message: 'A quantidade deve ter pelo menos 1 caractere.' }),
  unidade: z.enum(UNIDADES, { message: 'Unidade inválida.' }),
  nome: z.string().min(1, { message: 'O ingrediente deve ter pelo menos 1 caractere.' }),
})

const formSchema = z.object({
  nome: z
    .string({ required_error: 'O nome da receita é obrigatório.' })
    .min(1, 'O nome da receita deve ter pelo menos 1 caractere.'),
  imagem: z
    .instanceof(File, { message: 'Escolha uma imagem.' })
    .refine(file => file.size <= MAX_FILE_SIZE, 'O tamanho máximo do arquivo é 3 MB.')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Arquivos .jpg, .jpeg, .png e .webp são aceitos.'
    ),
  serve: z.coerce
    .number()
    .refine(value => Number(value) > 0, 'Serve deve ser um número positivo.')
    .refine(value => Number(value) >= 1, 'Serve deve ser maior ou igual a 1.')
    .refine(value => Number(value) <= 100, 'Serve deve ser menor ou igual a 100.'),
  tempo: z.coerce
    .number()
    .refine(value => Number(value) > 0, 'Tempo deve ser um número positivo.')
    .refine(value => Number(value) >= 1, 'Tempo deve ser maior ou igual a 1.')
    .refine(value => Number(value) <= 1000, 'Tempo deve ser menor ou igual a 1000.'),
  descricao: z
    .string({ required_error: 'A descrição da receita é obrigatória.' })
    .min(5, 'A descrição da receita deve ter pelo menos 5 caracteres.'),
  categoria: z.string().array().nonempty('Escolha pelo menos uma categoria.'),
  ingredientes: z.array(ingredientesSchema),
  passos: z
    .string()
    .min(5, 'O passo deve ter pelo menos 5 caractere.')
    .array()
    .nonempty('Adicione pelo menos um passo.'),
})

export const CreateRecipeSchema = formSchema
export type TCreateRecipeData = z.infer<typeof CreateRecipeSchema>
export type TCreateRecipeDataAfterValidation = Omit<TCreateRecipeData, 'imagem'> & {
  imagem: string
}
