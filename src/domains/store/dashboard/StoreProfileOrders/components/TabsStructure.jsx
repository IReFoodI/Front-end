import { useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ui/components/ui/tabs"

import { OrdersList } from "./OrdersList"

export function TabsStructure({
  pendingOrders,
  scheduledOrders,
  setOrder,
  orderRef,
  setUser,
  refreshOrders,
  setRefreshOrders,
}) {
  const [isTabActive, setIsTabActive] = useState({
    pending: true,
    scheduled: false,
  })

  return (
    <Tabs defaultValue="pending" className="flex h-full w-full flex-col">
      <TabsList className="max-h-16 min-h-16 w-full flex-grow overflow-hidden rounded-none border-b-2 border-gray-400">
        <TabsTrigger
          value="pending"
          className="flex h-full w-full gap-3 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-orange-500 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-500"
          onClick={() => setIsTabActive({ pending: true, scheduled: false })}
        >
          Pendentes
          <span
            className={`h-5 w-5 rounded-full bg-gray-500 text-white data-[state=active]:bg-orange-500 ${isTabActive.pending ? "bg-orange-500" : "bg-gray-500"}`}
          >
            {pendingOrders?.length}
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
            {scheduledOrders?.length}
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="pending"
        className="mt-0 min-h-[300px] flex-grow overflow-y-auto lg:min-h-[400px]"
      >
        <OrdersList
          orders={pendingOrders}
          isDoneOrCanceled={false}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
          refreshOrders={refreshOrders}
          setRefreshOrders={setRefreshOrders}
        />
      </TabsContent>
      <TabsContent
        value="scheduled"
        className="lg:min-h[400px] mt-0 min-h-[300px] flex-grow overflow-y-auto"
      >
        <OrdersList
          orders={scheduledOrders}
          isDoneOrCanceled={false}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
          refreshOrders={refreshOrders}
          setRefreshOrders={setRefreshOrders}
        />
      </TabsContent>
    </Tabs>
  )
}
