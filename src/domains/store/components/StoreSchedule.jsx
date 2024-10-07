import { useState } from "react"

import { ScheduleRow } from "./ScheduleRow"

const daysOfWeek = [
  { name: "Segunda-feira", key: "monday" },
  { name: "Terça-feira", key: "tuesday" },
  { name: "Quarta-feira", key: "wednesday" },
  { name: "Quinta-feira", key: "thursday" },
  { name: "Sexta-feira", key: "friday" },
  { name: "Sábado", key: "saturday" },
  { name: "Domingo", key: "sunday" },
]

export function StoreSchedule() {
  const [schedule, setSchedule] = useState(
    daysOfWeek.map((day) => ({
      day: day.name,
      enabled: false,
      startHour: "",
      startMinute: "",
      endHour: "",
      endMinute: "",
    }))
  )

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...schedule]
    updatedSchedule[index][field] = value
    setSchedule(updatedSchedule)
  }

  const handleSave = () => {
    console.log("Horário salvo:", schedule)
  }

  return (
    <div className="mx-auto max-w-lg p-4">
      <h2 className="mb-2 text-xl font-bold">Horário da loja</h2>
      <p className="mb-4 text-gray-500">
        Ajuste os horários que sua loja está aberta
      </p>
      {daysOfWeek.map((day, index) => (
        <ScheduleRow
          key={day.key}
          dayName={day.name}
          disabled={index >= 5}
          enabled={schedule[index].enabled}
          startHour={schedule[index].startHour}
          startMinute={schedule[index].startMinute}
          endHour={schedule[index].endHour}
          endMinute={schedule[index].endMinute}
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
        />
      ))}
      <button
        onClick={handleSave}
        className="mt-4 rounded-md border-4 border-primary bg-primary px-4 text-xl font-semibold text-primary-foreground"
      >
        Salvar alterações
      </button>
    </div>
  )
}
