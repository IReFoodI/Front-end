import { IconShoppingBag } from "@tabler/icons-react"
import { useEffect } from "react"

// import { Button } from "./Button"
import { Button } from "@/ui/components/ui/button/button"

import useOrderStore from "../../../../app/store/userOrderStore"
import userStore from "../../stores/userStore"
import { CardItem } from "../CardItem"

const OrderHistory = () => {
  const { orderHistory, fetchOrders } = useOrderStore()
  const { userId } = userStore()

  useEffect(() => {
    fetchOrders(userId)
  }, [userId, fetchOrders])

  return (
    <div className="flex w-full flex-col items-start px-8">
      <div className="flex w-full flex-col">
        {orderHistory.length > 0 ? (
          <>
            <h2 className="my-8 text-center font-semibold text-orange-500 lg:px-24 lg:text-start">
              Histórico
            </h2>
            <div className="mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {orderHistory.map((order, index) => (
                <CardItem key={index} data={order} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <div className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center">
              <IconShoppingBag size={45} />
              <h2 className="text-xl font-semibold">
                Você ainda não fez pedidos!
              </h2>
              <p className="w-[250px]">
                explore as lojas e tire a barriga da miséria hoje mesmo!
              </p>
              <Button className="w-full rounded-full px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out">
                explorar agora!
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
