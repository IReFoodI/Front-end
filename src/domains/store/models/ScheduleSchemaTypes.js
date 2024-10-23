import { z } from "zod"

const hourSchema = z.string().refine(
  (value) => {
    const number = parseInt(value, 10)
    return (
      /^\d{0,2}$/.test(value) && (value === "" || (number >= 0 && number <= 23))
    )
  },
  { message: "Deve ser um valor entre 0 e 23" }
)

const minuteSchema = z.string().refine(
  (value) => {
    const number = parseInt(value, 10)
    return (
      /^\d{0,2}$/.test(value) && (value === "" || (number >= 0 && number <= 59))
    )
  },
  { message: "Deve ser um valor entre 0 e 59" }
)

export const scheduleSchema = z
  .object({
    startHour: hourSchema,
    startMinute: minuteSchema,
    endHour: hourSchema,
    endMinute: minuteSchema,
  })
  .refine(
    (data) => {
      const startHour = parseInt(data.startHour, 10)
      const endHour = parseInt(data.endHour, 10)
      return startHour < endHour || data.startHour === "" || data.endHour === ""
    },
    {
      message: "Hora de abrir maior que a de fechar",
      path: ["endHour"],
    }
  )
