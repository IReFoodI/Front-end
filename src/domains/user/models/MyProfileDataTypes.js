import { z } from "zod"

const phoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/

export const formSchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório",
    })
    .trim()
    .min(2, "O nome precisa ter no mínimo 2 caracteres")
    .max(200, "Você ultrapassou o limite de 200 caracteres")
    .toLowerCase()
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Este campo só aceita letras")
    .transform((str) => str.replace(/\s+/g, " ")),
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email({ message: "Formato de e-mail inválido" }),
  phone: z
    .string({
      required_error: "Campo obrigatório",
    })
    .regex(phoneRegex, { message: "Número de telefone inválido" })
    .transform((str) => str.replace(/[^\d]/g, "")),
})
