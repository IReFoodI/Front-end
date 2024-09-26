import { z } from "zod"

export const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    newPassword: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
