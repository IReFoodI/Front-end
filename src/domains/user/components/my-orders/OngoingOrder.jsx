import useOrderStore from "../../../../app/store/userOrderStore"
import { OrderCard } from "./OrderCard"

export function OngoingOrder() {
  const { orderOnGoing } = useOrderStore()

  return (
    <>
      <h2 className="my-8 w-full pl-9 text-left font-semibold text-orange-500 lg:text-start">
        Pedido em andamento
      </h2>
      {orderOnGoing.map((order, index) => {
        return (
          <OrderCard
            index={index}
            key={order.orderId}
            data={order}
            deliveryMethod="Retirada na loja"
            paymentMethod="CARD"
            paymentStatus="Aprovado"
          />
        )
      })}
    </>
  )
}
