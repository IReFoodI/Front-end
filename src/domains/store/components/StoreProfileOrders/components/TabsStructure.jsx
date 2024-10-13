import { useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ui/components/ui/tabs"

import { PendingOrders } from "./PendingOrders"
import { ScheduleOrders } from "./ScheduleOrders"

export function TabsStructure() {
  const [isTabActive, setIsTabActive] = useState({
    pending: false,
    scheduled: false,
  })
  return (
    <Tabs defaultValue="pending" className="h-full w-full">
      <TabsList className="h-16 w-full rounded-none border-b-2 border-gray-400">
        <TabsTrigger
          value="pending"
          className="flex h-full w-full gap-3 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-orange-500 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-500"
          onClick={() => setIsTabActive({ pending: true, scheduled: false })}
        >
          Pendentes
          <span
            className={`h-5 w-5 rounded-full bg-gray-500 text-white data-[state=active]:bg-orange-500 ${isTabActive.pending ? "bg-orange-500" : "bg-gray-500"}`}
          >
            0
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="scheduled"
          className="flex h-full w-full gap-3 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-green-500 data-[state=active]:bg-green-100"
          onClick={() => setIsTabActive({ pending: false, scheduled: true })}
        >
          Agendados
          <span
            className={`h-5 w-5 rounded-full text-white ${isTabActive.scheduled ? "bg-green-500" : "bg-gray-500"}`}
          >
            0
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <PendingOrders />
      </TabsContent>
      <TabsContent value="scheduled">
        <ScheduleOrders />
      </TabsContent>
    </Tabs>
  )
}
