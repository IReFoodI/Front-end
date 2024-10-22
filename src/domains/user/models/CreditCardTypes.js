import { z } from "zod"

export const creditCardSchema = z.object({
  number: z
    .string({
      required_error: "Campo obrigatório",
    })
    .regex(
      /^\d{16}$|^\d{4} \d{4} \d{4} \d{4}$/,
      "Preencha todos os números do cartão"
    )
    .transform((str) => str.replace(/\s/g, "")),
  name: z
    .string({
      required_error: "Digite o nome do titular",
    })
    .trim()
    .min(2, "O nome precisa ter no mínimo 2 caracteres")
    .max(200, "Você ultrapassou o limite de 200 caracteres")
    .toLowerCase()
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Este campo só aceita letras")

    .transform((str) => str.replace(/\s+/g, " ")),

  cpf: z
    .string({
      required_error: "Digite o CPF",
    })
    .trim()
    .min(1, { message: "Digite o CPF" })
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
      "Preencha todos os digitos do cpf"
    )
    .transform((str) => str.replace(/[.-]/g, "")),

  validity: z
    .string({
      required_error: "Digite a validade",
    })
    .trim()
    .min(1, { message: "Digite a validade" })
    .regex(/^\d{2}\/\d{2}$/, "Digite a validade")
    .transform((str) => str.replace(/\//g, ""))
    .refine(
      (data) => {
        const date = new Date()
        const currentMonth = date.getMonth() + 1
        const currentYear = Number(String(date.getFullYear()).slice(2, 4))

        const cardMonth = Number(data.slice(0, 2))
        const cardYear = Number(data.slice(2, 4))

        if (cardYear < currentYear) {
          return false
        }

        if (cardYear === currentYear && cardMonth < currentMonth) {
          return false
        }

        return true
      },
      {
        message: "O cartão já expirou",
      }
    ),
  cvv: z
    .string({
      required_error: "Digite o CVV",
    })
    .trim()
    .regex(/^\d{3}$/, "Digite o CVV"),
})
