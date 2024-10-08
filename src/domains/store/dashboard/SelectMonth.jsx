// import { IconCalendarMonth } from "@tabler/icons-react"
// import { addDays } from "date-fns"
// import { useState } from "react"

import { v4 as uuid } from "uuid"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"

// import { cn } from "@/app/utils/cn"
// import { Button } from "@/ui/components/ui/button/button"
// import { Calendar } from "@/ui/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/ui/components/ui/popover"

// export function MonthPicker({ className }) {
//   const [month, setMonth] = useState({
//     from: addDays(new Date(), -90),
//     to: new Date(),
//   })

//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !month && "text-muted-foreground"
//             )}
//           >
//             <IconCalendarMonth className="mr-2 h-4 w-4" />
//             {/* {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )} */}
//             <span>Pick a date</span>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={month?.from}
//             selected={month}
//             onSelect={setMonth}
//             numberOfMonths={1}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }
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
