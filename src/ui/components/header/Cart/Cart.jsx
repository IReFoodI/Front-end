import { IconTrash } from "@tabler/icons-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

import { currencyFormatter } from "@/app/utils/currencyFormatter"

import { Button } from "../../ui/button/button"
import { SheetHeader, SheetTitle } from "../../ui/sheet"
import useCartStore from "./useCartStore"

export function Cart() {
  const { cartItems, subtotal, fetchCart, clearCart } = useCartStore()

  useEffect(() => {
    const userId = 2
    fetchCart(userId)
  }, [fetchCart])

  return (
    <div className="mt-4 flex flex-col gap-6">
      <SheetHeader className="flex max-h-max-orders-sheet flex-col overflow-auto lg:max-h-max-orders-sheet-lg">
        <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
          Seu pedido em
        </SheetTitle>

        <SheetHeader className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-secondary px-2 py-2 text-sm font-bold lg:text-lg">
            <p className="font-semibold">Dragao Verde</p>
            <Link to="/">
              <p className="font-normal">Ver cardápio</p>
            </Link>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-1">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between rounded-md bg-secondary p-2 text-sm"
            >
              <div className="flex flex-col">
                <p className="text-sm font-bold lg:text-lg">
                  {item.quantity}x {item.nameProduct}
                </p>
                <span className="text-left text-xs font-semibold lg:text-base">
                  {currencyFormatter(item.unitValue)}
                </span>
              </div>
              <IconTrash
                className="cursor-pointer"
                onClick={() => console.log("click trash")}
              />
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="text-center text-sm font-semibold text-gray-400 lg:text-lg"
        >
          Adicionar mais itens
        </Link>
      </SheetHeader>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-base font-bold lg:text-xl">
            <p>Subtotal</p>
            <span>{currencyFormatter(subtotal)}</span>
          </div>
          <Link to="/finalizar-pedido" className="w-full">
            <Button className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl">
              Pagar agora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
