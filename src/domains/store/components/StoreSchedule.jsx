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
          disabled={index >= 5} // Disable Saturday and Sunday by default
        />
      ))}
    </div>
  )
}
