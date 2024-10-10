import { z } from "zod"

export const changeEmailTypes = z
  .object({
    email: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "Formato de e-mail inválido" }),
    confirmEmail: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "Formato de e-mail inválido" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os e-mails não coincidem",
    path: ["confirmEmail"],
  })
