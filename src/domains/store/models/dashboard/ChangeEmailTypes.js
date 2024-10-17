import { z } from "zod"

export const changeEmailTypes = z
  .object({
    oldEmail: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "Formato de e-mail inválido" }),
    email: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "Formato de e-mail inválido" }),
    confirmEmail: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "Formato de e-mail inválido" }),
  })
  .refine((data) => data.oldEmail !== data.email, {
    message: "O novo e-mail não pode ser igual o atual",
    path: ["email"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os e-mails não coincidem",
    path: ["confirmEmail"],
  })
