import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { tokenService } from "@/app/service/tokenService.js"

import { restaurantService } from "../../services/restaurantService.js"
import { AccordionsStructure } from "./components/AccordionsStructure"
import { TabsStructure } from "./components/TabsStructure"

export function StoreProfileOrders({ setOrder, orderRef, setUser }) {
  const [orders, setOrders] = useState()
  const [restaurantId, setRestaurantId] = useState()
  const { onRequest } = useFetch()

  const getRestaurantId = async () => {
    await onRequest({
      request: () => tokenService.getInfoUsingToken(),
      onSuccess: (data) => {
        setRestaurantId(data.restaurantId)
      },
    })
  }

  const fetchStoreOrders = async () => {
    await onRequest({
      request: () => restaurantService.getRestaurantOrders(restaurantId),
      onSuccess: (data) => {
        setOrders(data)
      },
    })
  }

  useEffect(() => {
    getRestaurantId()
    if (restaurantId) {
      fetchStoreOrders()
    }
  }, [restaurantId])

  function filterOrders(filter) {
    return orders.filter((order) => order.orderStatus == filter)
  }

  if (!orders) {
    return (
      <div className="flex h-full items-center justify-center p-2 text-center text-2xl font-bold text-orange-500 shadow-2xl">
        <p>Não foram realizados pedidos ainda!</p>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col bg-slate-100 shadow-right lg:w-1/3">
      <div className="flex-grow overflow-y-auto">
        <TabsStructure
          pendingOrders={filterOrders("EMPRODUCAO")} //colocar pendente
          scheduledOrders={filterOrders("APROVADO")}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
        />
      </div>
      <div className="flex flex-col">
        <AccordionsStructure
          doneOrders={filterOrders("CONCLUIDO")}
          canceledOrders={filterOrders("CANCELADO")}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
        />
      </div>
    </div>
  )
}
