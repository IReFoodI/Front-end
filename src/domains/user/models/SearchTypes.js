import { z } from "zod"

export const searchSchema = z.object({
  search: z
    .string()
    .regex(/^[\p{L}\p{N}\s]*$/u, {
      message: "A pesquisa só pode conter letras, números e espaços",
    })
    .trim()
    .transform((str) => str.replace(/\s+/g, " ")),
})
