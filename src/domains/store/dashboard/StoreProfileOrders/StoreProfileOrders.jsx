import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { tokenService } from "@/app/service/tokenService.js"

import { restaurantService } from "../../services/restaurantService.js"
import { AccordionsStructure } from "./components/AccordionsStructure"
import { TabsStructure } from "./components/TabsStructure"

export function StoreProfileOrders({
  setRefreshOrders,
  refreshOrders,
  setOrder,
  orderRef,
  setUser,
}) {
  const [orders, setOrders] = useState()
  const [restaurantId, setRestaurantId] = useState()
  const { onRequest, error } = useFetch()

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
        if (data && data.length > 0) {
          setOrders(data)
        } else {
          setOrders([])
        }
      },
      showError: false,
    })
  }

  useEffect(() => {
    getRestaurantId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (restaurantId) {
      fetchStoreOrders()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, refreshOrders])

  function filterOrders(filter) {
    return orders.filter((order) => order.orderStatus == filter)
  }

  if (!orders || error) {
    return (
      <div className="flex h-full items-center justify-center p-2 text-center text-2xl font-bold text-orange-500 shadow-2xl">
        <p>Não foram realizados pedidos ainda!</p>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col bg-slate-100 shadow-right lg:min-w-96">
      <div className="flex-grow overflow-y-auto">
        <TabsStructure
          pendingOrders={filterOrders("PENDENTE")}
          scheduledOrders={filterOrders("PREPARANDO")}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
          refreshOrders={refreshOrders}
          setRefreshOrders={setRefreshOrders}
        />
      </div>
      <div className="flex flex-col">
        <AccordionsStructure
          doneOrders={filterOrders("CONCLUIDOS")}
          canceledOrders={filterOrders("CANCELADO")}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
          refreshOrders={refreshOrders}
          setRefreshOrders={setRefreshOrders}
        />
      </div>
    </div>
  )
}
