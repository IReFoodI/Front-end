import { z } from "zod"

import { states } from "@/domains/store/models/StoreAddressType"

export const changeUserAddressTypes = z.object({
  zipCode: z
    .string()
    .min(8, { message: "Insira um CEP válido com 8 caracteres." }),
  street: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }),
  number: z.string().min(1, { message: "O número é obrigatório." }),
  district: z
    .string()
    .min(3, { message: "Bairro deve ter pelo menos 3 caracteres." }),
  complemento: z.string().optional(),
  city: z
    .string()
    .min(3, { message: "Cidade deve ter pelo menos 3 caracteres." }),
  state: z.enum(states, { message: "Selecione um estado válido." }),
})
