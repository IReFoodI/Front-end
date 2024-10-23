import { useCallback, useEffect, useState } from "react"

import useFetch from "@/app/hooks/useFetch"
import { fetchRestaurantHours } from "@/domains/store/hooks/fetchRestaurantHours"

import { ScheduleRow } from "./StoreScheduleRow"

const daysOfWeek = [
  { name: "Segunda-feira", key: "MONDAY" },
  { name: "Terça-feira", key: "TUESDAY" },
  { name: "Quarta-feira", key: "WEDNESDAY" },
  { name: "Quinta-feira", key: "THURSDAY" },
  { name: "Sexta-feira", key: "FRIDAY" },
  { name: "Sábado", key: "SATURDAY" },
  { name: "Domingo", key: "SUNDAY" },
]

export function StoreSchedule() {
  const [schedule, setSchedule] = useState([])
  const [hasError, setHasError] = useState(false)
  const { loading, error, onRequest } = useFetch()

  const restaurantId = 1 // substituir pelo ID do usuário

  useEffect(() => {
    onRequest({
      request: () => fetchRestaurantHours(restaurantId),
      onSuccess: (data) => {
        const initialSchedule = daysOfWeek.map((day) => {
          const hoursForDay =
            data.find((item) => item.dayOfWeek === day.key) || {}
          return {
            day: day.name,
            enabled: !!hoursForDay.openingTime,
            startHour: hoursForDay.openingTime?.split(":")[0] || "",
            startMinute: hoursForDay.openingTime?.split(":")[1] || "",
            endHour: hoursForDay.closingTime?.split(":")[0] || "",
            endMinute: hoursForDay.closingTime?.split(":")[1] || "",
          }
        })
        setSchedule(initialSchedule)
      },
      errorMessage: "Erro ao carregar horários.",
    })
  }, [restaurantId, onRequest])

  const handleScheduleChange = useCallback(
    (index, field, value) => {
      const updatedSchedule = [...schedule]
      updatedSchedule[index][field] = value
      setSchedule(updatedSchedule)
    },
    [schedule]
  )

  const handleSave = () => {
    console.log("Horário salvo:", schedule)
  }

  const handleError = (error) => {
    console.log(error)
    setHasError(true) // Marca que houve um erro
  }

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro: {error.message}</p>

  return (
    <div className="mr-auto max-w-lg p-4">
      <h2 className="mb-2 text-center text-xl font-bold md:text-left">
        Horário da loja
      </h2>
      <p className="mb-4 text-center text-muted-foreground md:text-left">
        Ajuste os horários que sua loja está aberta
      </p>
      {schedule.map((item, index) => (
        <ScheduleRow
          key={daysOfWeek[index].key}
          dayName={item.day}
          enabled={item.enabled}
          startHour={item.startHour}
          startMinute={item.startMinute}
          endHour={item.endHour}
          endMinute={item.endMinute}
          onToggleEnabled={(enabled) =>
            handleScheduleChange(index, "enabled", enabled)
          }
          onStartHourChange={(value) =>
            handleScheduleChange(index, "startHour", value)
          }
          onStartMinuteChange={(value) =>
            handleScheduleChange(index, "startMinute", value)
          }
          onEndHourChange={(value) =>
            handleScheduleChange(index, "endHour", value)
          }
          onEndMinuteChange={(value) =>
            handleScheduleChange(index, "endMinute", value)
          }
          onError={handleError} // Lida com erros ao validar os campos
        />
      ))}
      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleSave}
          className={`mt-4 rounded-md border-4 border-primary bg-primary px-4 text-xl font-semibold text-primary-foreground ${
            hasError ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={hasError} // Desativa o botão se houver erro
        >
          Salvar alterações
        </button>
      </div>
    </div>
  )
}
