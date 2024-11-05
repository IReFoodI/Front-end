import { IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { currencyFormatter } from "@/app/utils/currencyFormatter"

import useCartStore from "../../../../app/store/useCartStore"
import { Button } from "../../ui/button/button"
import { SheetHeader, SheetTitle } from "../../ui/sheet"

export function Cart() {
  const { cartItems, subtotal, clearCart, restaurantName, removeItemFromCart } =
    useCartStore()

  return (
    <div className="mt-4 flex flex-col gap-6 text-gray-600">
      {cartItems.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          Seu carrinho está vazio.
        </div>
      ) : (
        <>
          <SheetHeader className="flex max-h-max-orders-sheet flex-col overflow-auto lg:max-h-max-orders-sheet-lg">
            <div className="flex justify-between pe-2 text-primary">
              <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
                Seu pedido em
              </SheetTitle>

              <button onClick={clearCart}>Limpar</button>
            </div>

            <SheetHeader className="flex flex-col">
              <div className="flex items-center justify-between rounded-md bg-secondary px-2 py-2 text-sm font-bold lg:text-lg">
                <p className="font-semibold">{restaurantName}</p>
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
                      {currencyFormatter(item.quantity * item.unitValue)}
                    </span>
                  </div>
                  <IconTrash
                    className="cursor-pointer"
                    onClick={() => removeItemFromCart(item.productId)}
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
        </>
      )}
    </div>
  )
}
