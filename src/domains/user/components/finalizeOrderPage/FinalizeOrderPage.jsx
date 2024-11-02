import { Link } from "react-router-dom"

import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"

import { OrderDetails } from "./OrderDetails"
import Orderitems from "./Orderitems"

export function FinalizeOrderPage() {
  const { cards } = userCardStore()
  return (
    <div
      id="page"
      className="mx-auto flex h-full w-full max-w-[1216px] flex-col justify-center text-gray-600 antialiased"
    >
      <h1 className="mb-5 w-full pb-6 text-center text-2xl font-semibold">
        Finalize seu pedido
      </h1>
      <div className="mx-auto flex w-full flex-col lg:flex-row">
        <div className="mb-11 min-w-[50%] lg:mb-0">
          {/* LEFT - ORDER DETAILS */}
          <OrderDetails />
        </div>
        {/* RIGHT - ITEMS */}
        <div className="min-w-[45%]">
          <Orderitems />
        </div>
        {cards.length > 0 ? (
          <Link to="/pedidos" className="w-full">
            <div className="mx-auto my-11 w-full max-w-[400px] px-5 lg:hidden">
              <Button className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl">
                Finalizar
              </Button>
            </div>
          </Link>
        ) : (
          <div className="mx-auto my-11 w-full max-w-[400px] px-5 lg:hidden">
            <Button
              className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl"
              disabled
            >
              Finalizar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
