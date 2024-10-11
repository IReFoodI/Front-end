import { z } from "zod"

export const productSchema = z.object({
  foto: z
    .string()
    .url("URL inválida")
    .max(200, "A URL não pode ter mais de 200 caracteres"),
  name: z
    .string()
    .min(1, "O nome do produto é obrigatório")
    .max(200, "O nome não pode ter mais de 200 caracteres"),
  description: z
    .string()
    .max(500, "A descrição não pode ter mais de 500 caracteres"),
  expirationDate: z.date(),
  quantity: z
    .number()
    .int("A quantidade deve ser um número inteiro")
    .nonnegative("A quantidade não pode ser negativa"),
  originalPrice: z
    .number()
    .positive("O preço original deve ser maior que zero"),
  sellPrice: z.number().positive("O preço de venda deve ser maior que zero"),
  status: z.boolean().optional(), // pode ser omitido, padrão será `false`
})
