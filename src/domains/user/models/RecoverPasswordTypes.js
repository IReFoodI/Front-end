import { z } from "zod"

export const recoverPasswordTypes = z.object({
  email: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .email({ message: "Formato de e-mail inválido" }),
})
