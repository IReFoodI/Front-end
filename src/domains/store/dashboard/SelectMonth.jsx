import { v4 as uuid } from "uuid"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

export function SelectMonth({ selectedMonth, setSelectedMonth, selectedYear }) {
  const isCurrentYear = new Date().getFullYear().toString() === selectedYear
  const monthNumber = isCurrentYear ? new Date().getMonth() : 11
  const months = {
    0: "Janeiro",
    1: "Fevereiro",
    2: "Março",
    3: "Abril",
    4: "Maio",
    5: "Junho",
    6: "Julho",
    7: "Agosto",
    8: "Setembro",
    9: "Outubro",
    10: "Novembro",
    11: "Dezembro",
  }
  return (
    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: monthNumber + 1 }).map((_, index) => {
          return (
            <SelectItem key={uuid()} value={String(index)}>
              {months[index]}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
