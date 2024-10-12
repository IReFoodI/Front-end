import { z } from "zod"

export const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

export const StoreAddressSchema = z.object({
  cep: z.string().min(8, { message: "Insira um CEP válido com 8 caracteres." }),
  endereco: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }),
  numero: z.string().min(1, { message: "Insira o número." }),
  apto: z.string().optional(),
  complemento: z.string().optional(),
  cidade: z
    .string()
    .min(3, { message: "Cidade deve ter pelo menos 3 caracteres." }),
  uf: z.enum(states, { message: "Selecione um estado válido." }),
})
