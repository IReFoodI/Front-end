import {
  IconClockHour5,
  IconCurrencyDollar,
  IconSoup,
  IconTruck,
} from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { dateFormatter } from "@/app/utils/dateFormatter"
import { getStatus } from "@/app/utils/OrderUtils"
import { userService } from "@/domains/user/services/userService"
import { NotFound } from "@/ui/components/NotFound"

import { OrderStatus } from "../../models/OrderStatusOptions"
import { restaurantService } from "../../services/restaurantService"
import { StoreProfileOrders } from "../StoreProfileOrders/StoreProfileOrders"
import { OrderItemsTable } from "./components/OrderItemsTable"

export function OrderDetails() {
  const [currentOrder, setCurrentOrder] = useState()
  const [orderStatus, setOrderStatus] = useState()
  const [user, setUser] = useState()
  const [transaction, setTransaction] = useState()
  const [refreshOrders, setRefreshOrders] = useState(false)
  const targetOrderRef = useRef(null)
  const { onRequest } = useFetch()

  function capitalize(text) {
    return String(text).charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const handleOrderAcceptance = async (status) => {
    await onRequest({
      request: () =>
        restaurantService.updateStatusOrder(currentOrder.orderId, status),
      onSuccess: (data) => {
        const updatedOrder = { ...currentOrder, orderStatus: data.orderStatus }
        setCurrentOrder(updatedOrder)
        setOrderStatus(getStatus(status))
        setRefreshOrders(!refreshOrders)
      },
    })
  }

  useEffect(() => {
    const fetchTransaction = async () => {
      await onRequest({
        request: () =>
          userService.getTransactionById(currentOrder.transactionId),
        onSuccess: (data) => {
          setTransaction(data)
        },
      })
    }

    if (currentOrder && currentOrder.transactionId != null) {
      fetchTransaction()
    }
  }, [currentOrder, onRequest])

  useEffect(() => {
    if (currentOrder !== undefined) {
      setOrderStatus(getStatus(currentOrder))
    }
  }, [currentOrder])

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <StoreProfileOrders
        refreshOrders={refreshOrders}
        setRefreshOrders={setRefreshOrders}
        setOrder={setCurrentOrder}
        orderRef={targetOrderRef}
        setUser={setUser}
      />

      {currentOrder !== undefined ? (
        <div
          ref={targetOrderRef}
          className="m-4 flex w-full flex-col justify-between lg:m-10 lg:mx-32"
        >
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 lg:gap-1">
                <p className="text-lg font-semibold lg:text-xl">
                  Pedido #{currentOrder.orderId}
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
                <h1 className="text-2xl lg:text-4xl">{user.name}</h1>
                {/* <Button className="gap-1 rounded-2xl text-xs">
                  <IconPhone size={24} />
                  Entrar em contato
                </Button> */}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded border-2 border-gray-300 bg-gray-200 p-1">
                  <IconClockHour5 className="text-orange-500" />
                  <div className="flex gap-1 text-sm">
                    <p className="font-bold">Agendado:</p>
                    <p className="flex">
                      {dateFormatter(new Date(currentOrder.orderDate))}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded border-2 border-gray-300 bg-gray-200 p-1">
                  <IconTruck className="text-orange-500" />
                  <p className="text-sm font-bold">
                    {capitalize(currentOrder.deliveryType)}
                  </p>
                </div>

                {transaction && (
                  <div className="flex items-center gap-3 rounded border-2 border-gray-300 bg-gray-200 p-1 text-sm lg:gap-2">
                    <IconCurrencyDollar className="text-orange-500" />
                    <div className="flex gap-1">
                      <p className="font-bold">Pagamento:</p>
                      <p className="font-normal">Cartão</p>
                    </div>
                    <p className="rounded-xl bg-orange-500 p-1 px-3 font-semibold text-white">
                      {currentOrder.transaction &&
                        capitalize(transaction.transactionStatus)}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <OrderItemsTable
                  orderItems={currentOrder.orderItems}
                  totalValue={currentOrder.totalValue}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between py-5">
            {currentOrder.orderStatus !== OrderStatus.CANCELADO &&
              currentOrder.orderStatus !== OrderStatus.AGUARDANDO_RETIRADA &&
              currentOrder.orderStatus !== OrderStatus.CONCLUIDO && (
                <>
                  <button
                    onClick={() => {
                      handleOrderAcceptance(OrderStatus.AGUARDANDO_RETIRADA)
                      setCurrentOrder((currentOrder) => {
                        return {
                          ...currentOrder,
                          orderStatus: OrderStatus.AGUARDANDO_RETIRADA,
                        }
                      })
                    }}
                    className="cursor-pointer text-lg font-semibold text-orange-500 underline hover:text-orange-400"
                  >
                    Solicitar Retirada
                  </button>
                  <button
                    onClick={() => handleOrderAcceptance(OrderStatus.CANCELADO)}
                    className="cursor-pointer text-lg font-semibold text-gray-500 underline hover:text-gray-400"
                  >
                    Cancelar Pedido
                  </button>
                </>
              )}
            {currentOrder.orderStatus === OrderStatus.AGUARDANDO_RETIRADA &&
              currentOrder.orderStatus !== OrderStatus.CONCLUIDO && (
                <>
                  <button
                    onClick={() => handleOrderAcceptance(OrderStatus.CONCLUIDO)}
                    className="cursor-pointer text-lg font-semibold text-orange-500 underline hover:text-orange-400"
                  >
                    Confirmar pedido
                  </button>
                  <button
                    onClick={() => handleOrderAcceptance(OrderStatus.CANCELADO)}
                    className="cursor-pointer text-lg font-semibold text-gray-500 underline hover:text-gray-400"
                  >
                    Cancelar Pedido
                  </button>
                </>
              )}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-center">
          <NotFound
            Icon={IconSoup}
            title={"Detalhes de um produto"}
            description={
              "Selecione um pedido para saber mais detalhes sobre ele!"
            }
          />
        </div>
      )}
    </div>
  )
}
