import { z } from "zod"

export const productSchema = z.object({
  nameProd: z
    .string()
    .min(1, "O nome do produto é obrigatório")
    .max(200, "O nome não pode ter mais de 200 caracteres"),
  descriptionProd: z
    .string()
    .max(500, "A descrição não pode ter mais de 500 caracteres"),
  expirationDate: z
    .date({
      required_error: "Adicione uma data",
      invalid_type_error: "Adicione uma data",
    })
    .refine(
      (data) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const selectedDate = new Date(data)
        selectedDate.setHours(0, 0, 0, 0)

        return selectedDate.getTime() > today.getTime()
      },
      {
        message: "Selecione uma data maior que o dia atual",
      }
    ),

  quantity: z
    .string()
    .transform((value) => parseFloat(value) || 0)
    .pipe(
      z.number().nonnegative("A quantidade deve ser maior ou igual a zero")
    ),
  originalPrice: z
    .string()
    .transform((value) => parseFloat(value) || 0)
    .pipe(z.number().positive("O preço original deve ser maior que zero")),
  sellPrice: z
    .string()
    .transform((value) => parseFloat(value) || 0)
    .pipe(z.number().positive("O preço original deve ser maior que zero")),
})
