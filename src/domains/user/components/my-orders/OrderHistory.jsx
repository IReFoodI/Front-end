import { IconShoppingBag } from "@tabler/icons-react"
import { useEffect } from "react"

import { NotFound } from "@/ui/components/NotFound"

import useOrderStore from "../../../../app/store/userOrderStore"
import useUserStore from "../../stores/useUserStore"
import { CardItem } from "../CardItem"

const OrderHistory = () => {
  const { orderHistory, fetchOrders } = useOrderStore()
  const { userId } = useUserStore()

  useEffect(() => {
    fetchOrders(userId)
  }, [userId, fetchOrders])

  return (
    <>
      <h2 className="my-8 w-full pl-9 text-left font-semibold text-orange-500 lg:text-start">
        Histórico de pedidos
      </h2>
      <div className="flex w-full flex-col items-start px-8">
        <div className="flex w-full flex-col">
          {orderHistory.length > 0 ? (
            <div className="mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {orderHistory.map((order, index) => (
                <CardItem key={index} data={order} />
              ))}
            </div>
          ) : (
            <NotFound
              Icon={IconShoppingBag}
              title={"Sem hitórico de pedido finalizado!"}
              description={"Após a compra seus produtos aparecerão aqui "}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default OrderHistory
