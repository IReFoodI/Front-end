import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"

import { OrderDetails } from "./OrderDetails"
import Orderitems from "./Orderitems"

export function FinalizeOrderPage() {
  return (
    <div
      id="page"
      className="mx-auto flex h-full w-full max-w-[1216px] flex-col items-center justify-center text-gray-600 antialiased lg:mt-11 lg:h-auto lg:flex-row lg:items-start"
    >
      <div className="mb-11 min-w-[45%] lg:mb-0">
        {/* LEFT - ORDER DETAILS */}
        <OrderDetails />
      </div>
      {/* RIGHT - ITEMS */}
      <div className="min-w-[45%]">
        <Orderitems />
      </div>
      <Link to="/pedidos" className="w-full">
        <div className="mx-auto my-11 w-full max-w-[400px] px-5 lg:hidden">
          <Button className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl">
            Finalizar
          </Button>
        </div>
      </Link>
    </div>
  )
}
