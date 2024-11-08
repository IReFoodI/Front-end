import { useNavigate } from "react-router-dom"

import useCartStore from "@/app/store/useCartStore"
import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"

import { finalizeOrder } from "../../../../app/utils/finalizeOrder"
import { OrderDetails } from "./OrderDetails"
import Orderitems from "./Orderitems"

export function FinalizeOrderPage() {
  const { cards, selectedCard } = userCardStore()
  const { cartItems } = useCartStore()

  const navigate = useNavigate()

  const handleFinalizeOrder = () => finalizeOrder({ navigate })

  return (
    <div
      id="page"
      className="mx-auto flex h-full w-full max-w-[1216px] flex-col justify-center text-gray-600 antialiased"
    >
      <h1 className="mb-5 w-full pb-6 text-center text-2xl font-semibold">
        Finalize seu pedido
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          Seu carrinho está vazio.
        </div>
      ) : (
        <div className="mx-auto flex w-full flex-col lg:flex-row">
          <div className="mb-11 min-w-[50%] lg:mb-0">
            {/* LEFT - ORDER DETAILS */}
            <OrderDetails />
          </div>
          {/* RIGHT - ITEMS */}
          <div className="min-w-[45%]">
            <Orderitems />
          </div>

          {/* BUTTON FINALIZAR */}
          <div className="mx-auto my-11 w-full max-w-[400px] px-5 lg:hidden">
            <Button
              className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl"
              onClick={handleFinalizeOrder}
              disabled={
                cards.length === 0 || !selectedCard || !cartItems.length
              }
            >
              Finalizar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
