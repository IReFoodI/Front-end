import {
  IconClockHour5,
  IconCurrencyDollar,
  IconPhone,
  IconTruck,
} from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

import { getStatus } from "@/app/utils/OrderUtils"
import { Button } from "@/ui/components/ui/button/button"

import { StoreProfileOrders } from "../StoreProfileOrders/StoreProfileOrders"
import { OrderItemsTable } from "./components/OrderItemsTable"

export function OrderDetails() {
  const [currentOrder, setCurrentOrder] = useState()
  const [orderStatus, setOrderStatus] = useState()
  const targetOrderRef = useRef(null)

  useEffect(() => {
    if (currentOrder !== undefined) {
      setOrderStatus(getStatus(currentOrder))
    }
  }, [currentOrder])

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <StoreProfileOrders
        setOrder={setCurrentOrder}
        orderRef={targetOrderRef}
      />

      {currentOrder !== undefined ? (
        <div
          ref={targetOrderRef}
          className="m-4 flex w-full flex-col justify-between lg:m-10 lg:mx-32 lg:w-2/3"
        >
          <div className="flex w-full flex-col justify-center gap-4">
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-2 lg:gap-1">
                <p className="text-lg font-semibold lg:text-xl">
                  Pedido #{currentOrder.orderNumber}
                </p>
                <div className="flex items-center gap-3 rounded-md p-2">
                  <div className="flex items-center gap-1">
                    {orderStatus !== undefined && orderStatus.icon}
                    <p className="text-xs lg:text-sm">
                      {orderStatus !== undefined && orderStatus.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 font-semibold">
                <h1 className="text-2xl lg:text-4xl">
                  {currentOrder.client.clientName}
                </h1>
                <Button className="gap-1 rounded-2xl text-xs">
                  <IconPhone size={24} />
                  Entrar em contato
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded border-2 border-gray-300 bg-gray-200 p-1">
                  <IconClockHour5 className="text-orange-500" />
                  <div className="flex gap-1 text-sm">
                    <p className="font-bold">Agendado:</p>
                    <p className="flex">
                      {
                        (currentOrder.timeOfDelivery.day + " + ",
                        currentOrder.timeOfDelivery.initialTime +
                          " - " +
                          currentOrder.timeOfDelivery.finalTime)
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded border-2 border-gray-300 bg-gray-200 p-1">
                  <IconTruck className="text-orange-500" />
                  <p className="text-sm font-bold">
                    {currentOrder.typeOfReceiving}
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded border-2 border-gray-300 bg-gray-200 p-1 text-sm lg:gap-2">
                  <IconCurrencyDollar className="text-orange-500" />
                  <div className="flex gap-1">
                    <p className="font-bold">Pagamento:</p>
                    <p className="font-normal">{currentOrder.payment}</p>
                  </div>
                  <p className="rounded-xl bg-orange-500 p-1 px-3 font-semibold text-white">
                    {currentOrder.paymentStatus}
                  </p>
                </div>
              </div>

              <div>
                <OrderItemsTable
                  orderItems={currentOrder.items}
                  totalValue={currentOrder.totalValue}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between py-5">
            <span className="cursor-pointer text-lg font-semibold text-orange-600 underline hover:text-orange-500">
              Preciso de ajuda
            </span>
            <span className="cursor-pointer text-lg font-semibold text-gray-500 underline hover:text-gray-400">
              Cancelar Pedido
            </span>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-center">
          <p className="m-12 text-xl font-semibold text-orange-500">
            Selecione um pedido para saber mais detalhes sobre ele!
          </p>
        </div>
      )}
    </div>
  )
}
