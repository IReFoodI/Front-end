import { z } from "zod"

import { states } from "./StoreAddressType"

const CNPJRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/
const phoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/

export const storeFormSchemaSignUp = z.object({
  storeName: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .trim()
    .min(1, { message: "Campo obrigatório!" })
    .max(100, { message: "Você ultrapassou o limite de 100 caracteres!" }),
  storeCNPJ: z
    .string()
    .trim()
    .regex(CNPJRegex, { message: "CNPJ inválido!" })
    .transform((str) => str.replace(/[^\d]/g, "")),
  storePhone: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .trim()
    .min(1, { message: "Campo obrigatório!" })
    .regex(phoneRegex, { message: "Telefone inválido!" })
    .transform((str) => str.replace(/[^\d]/g, "")),
  storeCategory: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .min(1, { message: "Campo obrigatório!" })
    .trim(),
  storeDescription: z
    .string()
    .min(20, { message: "Campo descrição deve ter no mínimo 20 caracteres." })
    .max(200, { message: "Você ultrapassou o limite de 200 caracteres!" }),

  cep: z.string().min(8, { message: "Insira um CEP válido com 8 caracteres." }),
  address: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }),
  number: z.string().min(1, { message: "O número é obrigatório." }),
  district: z
    .string()
    .min(3, { message: "Bairro deve ter pelo menos 3 caracteres." }),
  complemento: z.string().optional(),
  street: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }),
  city: z
    .string()
    .min(3, { message: "Cidade deve ter pelo menos 3 caracteres." }),
  state: z.enum(states, { message: "Selecione um estado válido." }),
})
