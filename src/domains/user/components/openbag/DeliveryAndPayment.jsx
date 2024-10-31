import { useState } from "react"
const DeliveryAndPayment = () => {
  const [order] = useState({
    delivery: "Retirada na loja",
    payment_method: "Cartão",
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
                {order.payment_method}
              </span>
              {/* <span className="bg-primary-foregroun text-xs font-semibold text-primary">
                {order.payment.status}
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryAndPayment
