import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { Loading } from "@/ui/components/ui/loading.jsx"

import { restaurantService } from "../../services/restaurantService.js"
import { AccordionsStructure } from "./components/AccordionsStructure"
import { TabsStructure } from "./components/TabsStructure"

export function StoreProfileOrders({ setOrder, orderRef, setUser }) {
  const [orders, setOrders] = useState()

  const { loading, onRequest } = useFetch()
  const fetchStoreOrders = async () => {
    await onRequest({
      request: () => restaurantService.getRestaurantHistoricalOrders(1),
      onSuccess: (data) => {
        setOrders(data)
      },
    })
  }

  useEffect(() => {
    fetchStoreOrders()
  }, [])

  function filterOrders(filter) {
    return orders.filter((order) => order.orderStatus == filter)
  }

  if (!orders) {
    return <Loading />
  }
  return (
    <div className="flex h-full flex-col bg-slate-100 shadow-right lg:w-1/3">
      <div className="flex-grow overflow-y-auto">
        <TabsStructure
          pendingOrders={filterOrders("ENVIADO")} //colocar pendente
          scheduledOrders={filterOrders("EMPRODUCAO")}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
        />
      </div>
      <div className="flex flex-col">
        <AccordionsStructure
          doneOrders={filterOrders("ENTREGUE")}
          canceledOrders={filterOrders("CANCELED")}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
        />
      </div>
    </div>
  )
}
