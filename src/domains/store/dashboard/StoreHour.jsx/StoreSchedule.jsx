import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

import { useFetch } from "@/app/hooks/useFetch"
import {
  addRestaurantHours,
  fetchRestaurantHours,
} from "@/domains/store/services/restaurantHoursService"

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

  const fetchHoursData = () => {
    onRequest({
      request: () => fetchRestaurantHours(),
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
            restaurantId: hoursForDay.restaurantId,
            id: hoursForDay.id,
          }
        })
        setSchedule(initialSchedule)
      },
      errorMessage: "Erro ao carregar horários.",
    })
  }

  useEffect(() => {
    fetchHoursData()
    //eslint-disable-next-line
  }, [])

  const handleScheduleChange = useCallback(
    (index, field, value) => {
      console.log({ index, field, value })
      const updatedItem = { ...schedule[index], [field]: value }
      const updatedSchedule = schedule.map((item, i) =>
        i === index ? updatedItem : item
      )

      setSchedule(updatedSchedule)
    },
    [schedule]
  )

  const handleUpdateSchedule = (index, data) => {
    console.log({ index, data })
    const updatedItem = { ...schedule[index], ...data }
    const updatedSchedule = schedule.map((item, i) =>
      i === index ? updatedItem : item
    )
    setSchedule(updatedSchedule)
  }
  const transformScheduleData = (schedule) => {
    return schedule.map((item) => ({
      dayOfWeek: daysOfWeek.find((day) => day.name === item.day)?.key,
      openingTime: `${item.startHour.padStart(2, "0")}:${item.startMinute.padStart(2, "0")}`,
      closingTime: `${item.endHour.padStart(2, "0")}:${item.endMinute.padStart(2, "0")}`,
      restaurantId: item.restaurantId,
      id: item?.id || null,
      enabled: item.enabled,
    }))
  }
  const postSchedule = (data) => {
    onRequest({
      request: () => addRestaurantHours(data),
      onSuccess: () => {},
      errorMessage: "Erro ao salvar hor YYS.",
    })
  }
  const handleSave = async () => {
    console.log({ schedule })
    const data = transformScheduleData(schedule)
    try {
      const results = await Promise.allSettled(
        data.map(async (item) => {
          return postSchedule(item)
        })
      )

      const allSuccessful = results.every(
        (result) => result.status === "fulfilled"
      )

      if (allSuccessful) {
        setHasError(false)
        toast.success("Horário salvo com sucesso!")
        fetchHoursData()
      } else {
        const failedItems = results.filter(
          (result) => result.status === "rejected"
        )
        console.error("Failed items:", failedItems)
        toast.error("Alguns horários não foram salvos.")
        fetchHoursData()
      }
    } catch (error) {
      handleError(error)
    }
  }

  const handleError = (error) => {
    if (error === null) return setHasError(false)
    setHasError(true)
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
          onToggleEnabled={() =>
            handleScheduleChange(index, "enabled", !item.enabled)
          }
          onUpdate={(data) => handleUpdateSchedule(index, data)}
          onError={handleError}
        />
      ))}
      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleSave}
          className={`mt-4 rounded-md border-4 border-primary bg-primary px-4 text-xl font-semibold text-primary-foreground ${
            hasError ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={hasError}
        >
          Salvar alterações
        </button>
      </div>
    </div>
  )
}
