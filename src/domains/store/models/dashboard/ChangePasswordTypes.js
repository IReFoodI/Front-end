import { z } from "zod"

export const changePasswordTypes = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .regex(/^\S*$/, { message: "A senha não deve conter espaços" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
        }
      ),
    password: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .regex(/^\S*$/, { message: "A senha não deve conter espaços" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .regex(/^\S*$/, { message: "A senha não deve conter espaços" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
        }
      ),
  })
  .refine(
    (data) => {
      console.log(data.oldPassword, data.password)
      console.log(data.oldPassword !== data.password)

      return data.oldPassword !== data.password
    },
    {
      message: "A nova senha não pode ser igual a antiga",
      path: ["password"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
