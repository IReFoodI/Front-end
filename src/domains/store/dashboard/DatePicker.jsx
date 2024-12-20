import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import * as React from "react"

import { cn } from "@/app/utils/cn"
import { Button } from "@/ui/components/ui/button/button"
import { Calendar } from "@/ui/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/components/ui/popover"

export function DatePicker({ className }) {
  const [date, setDate] = React.useState({
    from: addDays(new Date(), -90),
    to: new Date(),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function DatePickerSingle({ value, onChange, classCustom }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start rounded-md p-2 text-left font-normal",
            !value && "p-2 text-muted-foreground",
            classCustom
          )}
        >
          <CalendarIcon className="mr-2 hidden h-4 w-4 lg:inline" />
          {value instanceof Date && !isNaN(value) ? format(value, "PP") : <></>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
