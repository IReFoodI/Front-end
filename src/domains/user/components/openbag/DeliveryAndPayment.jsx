import { useState } from "react"
const DeliveryAndPayment = () => {
  const [order] = useState({
    pickupTime: "Hoje, 19:52 - 20:02",
    orderStatus: "A Loja está separando seu pedido",
    restaurant: {
      name: "Dragão Verde",
      type: "Restaurante",
      imgUrl: "https://via.placeholder.com/40",
    },
    orderNumber: 3399,
    orderItems: [
      {
        name: "Item a venda",
        description: "Descrição do item a venda...",
        price: "20.99",
      },
    ],
    subtotal: "20.99",
    delivery: "Retirada na loja",
    payment: {
      method: "PIX",
      status: "aprovado",
    },
  })
  return (
    <div className="mt-2">
      <div className="mt-2 rounded-lg bg-[#F8F9FE] p-4">
        <div className="flex items-center justify-between rounded-lg bg-background p-2">
          <div className="pr-2 text-sm text-secondary-foreground">
            <span className="block">Forma de entrega:</span>
            <span className="block font-semibold">{order.delivery}</span>
          </div>
          <div className="flex flex-col items-center space-x-1">
            <span className="text-sm text-secondary-foreground">
              Pagamento:
            </span>
            <div className="flex items-center space-x-1">
              <span className="rounded bg-primary px-2 py-1 text-xs text-white">
                {order.payment.method}
              </span>
              <span className="bg-primary-foregroun text-xs font-semibold text-primary">
                {order.payment.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryAndPayment
