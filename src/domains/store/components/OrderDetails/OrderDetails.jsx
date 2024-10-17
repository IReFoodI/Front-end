import {
  IconClockHour5,
  IconCurrencyDollar,
  IconPhone,
  IconTruck,
} from "@tabler/icons-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

import { getStatus } from "@/app/utils/OrderUtils"
import { Button } from "@/ui/components/ui/button/button"

import { OrderItemsTable } from "./components/OrderItemsTable"

export function OrderDetails() {
  const orders = [
    {
      orderId: 1,
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "canceled",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
      payment: "Pix",
      paymentStatus: "aprovado",
    },
    {
      orderId: 2,
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "accepted",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
      payment: "Pix",
      paymentStatus: "aprovado",
    },
    {
      orderId: 3,
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "done",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
      payment: "Pix",
      paymentStatus: "aprovado",
    },
    {
      orderId: 4,
      client: {
        clientName: "João Silva",
        clientPhoneNumber: 99999999999,
      },
      orderNumber: 12345,
      items: [
        { itemId: 1, itemName: "Hambúrguer", price: 20.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
        { itemId: 2, itemName: "Refrigerante", price: 5.0 },
      ],
      totalValue: 25.0,
      status: "pending",
      typeOfReceiving: "Retirada",
      timeOfDelivery: {
        day: "02/02/2025",
        initialTime: "19:52",
        finalTime: "20:02",
      },
      payment: "Pix",
      paymentStatus: "aprovado",
    },
  ]
  const { id } = useParams()

  function getOrderById(currentId) {
    return orders.filter((orderItem) => orderItem.orderId == currentId)[0]
  }

  const [currentOrder] = useState(getOrderById(id))
  const status = getStatus(currentOrder)

  return (
    <div className="m-4 flex flex-col justify-between lg:m-8">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 lg:gap-1">
            <p className="text-lg font-semibold lg:text-xl">
              Pedido #{currentOrder.orderNumber}
            </p>
            <div className="flex items-center gap-3 rounded-md p-2">
              <div className="flex items-center gap-1">
                {status.icon}
                <p className="text-xs lg:text-sm">{status.status}</p>
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

        <div className="flex flex-col gap-4">
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
  )
}
