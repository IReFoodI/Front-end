import { z } from "zod"

export const productSchema = z.object({
  // image: z
  //   .string()
  //   .url("URL inválida")
  //   .max(200, "A URL não pode ter mais de 200 caracteres"),
  name: z
    .string()
    .min(1, "O nome do produto é obrigatório")
    .max(200, "O nome não pode ter mais de 200 caracteres"),
  description: z
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
        today.setHours(0, 0, 0, 0) // Zera horas, minutos, segundos e milissegundos

        const selectedDate = new Date(data)
        selectedDate.setHours(0, 0, 0, 0) // Zera horas, minutos, segundos e milissegundos da data selecionada

        // Verifica se a data selecionada é maior que o dia atual (pelo menos o dia seguinte)
        return selectedDate.getTime() > today.getTime()
      },
      {
        message: "Selecione uma data maior que o dia atual",
      }
    ),

  quantity: z
    .string()
    .transform((value) => parseFloat(value))
    .pipe(
      z.number().nonnegative("A quantidade deve ser maior ou igual a zero")
    ),
  originalPrice: z
    .string()
    .transform((value) => parseFloat(value))
    .pipe(z.number().positive("O preço original deve ser maior que zero")),
  sellPrice: z
    .string()
    .transform((value) => parseFloat(value))
    .pipe(z.number().positive("O preço original deve ser maior que zero")),
})

export const editProductSchema = z.object({
  name: z
    .string()
    .min(1, "O nome do produto é obrigatório")
    .max(200, "O nome não pode ter mais de 200 caracteres"),
  description: z
    .string()
    .max(500, "A descrição não pode ter mais de 500 caracteres"),
  expirationDate: z.date({
    required_error: "Adicione uma data",
    invalid_type_error: "Adicione uma data",
  }),
  quantity: z
    .string()
    .transform((value) => parseFloat(value))
    .pipe(z.number().positive("O preço original deve ser maior que zero")),
  originalPrice: z
    .string()
    .transform((value) => parseFloat(value))
    .pipe(z.number().positive("O preço original deve ser maior que zero")),
  sellPrice: z
    .string()
    .transform((value) => parseFloat(value))
    .pipe(z.number().positive("O preço original deve ser maior que zero")),
  status: z.boolean().optional(),
})
