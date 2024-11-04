import { z } from "zod"

const CNPJRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/
const phoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/

export const storeFormSchema = z.object({
  fantasy: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .trim()
    .min(1, { message: "Campo obrigatório!" })
    .max(200, { message: "Você ultrapassou o limite de 200 caracteres!" }),
  cnpj: z
    .string()
    .trim()
    .regex(CNPJRegex, { message: "CNPJ inválido!" })
    .transform((str) => str.replace(/[^\d]/g, "")),
  phone: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .trim()
    .min(1, { message: "Campo obrigatório!" })
    .regex(phoneRegex, { message: "Telefone inválido!" })
    .transform((str) => str.replace(/[^\d]/g, "")),
  category: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .min(1, { message: "Campo obrigatório!" })
    .trim(),
  description: z
    .string()
    .min(20, { message: "Campo descrição deve ter no mínimo 20 caracteres." }),
})
