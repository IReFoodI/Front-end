import { z } from "zod"

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .email({ message: "Formato de e-mail inválido" }),
  password: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
})
