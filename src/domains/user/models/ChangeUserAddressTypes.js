import { z } from "zod"

import { states } from "@/domains/store/models/StoreAddressType"

export const changeUserAddressTypes = z.object({
  cep: z.string().min(8, { message: "Insira um CEP válido com 8 caracteres." }),
  street: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." })
    .max(40, { message: "O endereço deve ter no máximo 40 caracteres." }),
  number: z
    .string()
    .min(1, { message: "O número é obrigatório." })
    .max(10, { message: "O número deve ter no máximo 10 caracteres." }),
  district: z
    .string()
    .min(3, { message: "Bairro deve ter pelo menos 3 caracteres." })
    .max(30, { message: "O bairro deve ter no máximo 30 caracteres." }),
  complement: z
    .string()
    .max(10, { message: "O complemento deve ter no máximo 10 caracteres." })
    .optional(),
  type: z
    .string()
    .min(1, { message: "Campo obrigatório." })
    .min(3, { message: "Tipo deve ter pelo menos 2 caracteres." })
    .max(10, { message: "A etiqueta deve ter no máximo 10 caracteres." }),
  city: z
    .string()
    .min(3, { message: "Cidade deve ter pelo menos 3 caracteres." })
    .max(30, { message: "A cidade deve ter no máximo 30 caracteres." }),
  state: z.enum(states, { message: "Selecione um estado válido." }),
})
