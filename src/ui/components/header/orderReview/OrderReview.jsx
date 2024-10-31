import { RadiobuttonIcon } from "@radix-ui/react-icons"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { IconEdit } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { useCartStore } from "@/domains/store/hooks/useCartStore"

import { Button } from "../../ui/button/button"
import { SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet"

export function OrderReview() {
  const cart = useCartStore((state) => state.cart)

  console.log(cart)

  return (
    <div className="mt-4 flex flex-col gap-6">
      <SheetHeader className="flex max-h-max-orders-sheet flex-col overflow-auto lg:max-h-max-orders-sheet-lg">
        <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
          Revise o Pedido
        </SheetTitle>
        <SheetDescription></SheetDescription>
        <div className="flex flex-1 flex-col gap-1">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md bg-secondary p-2 text-sm"
              >
                <div className="flex flex-col">
                  <p className="text-sm font-bold lg:text-lg">
                    ( {item.amountAdded} ) {item.nameProd}
                  </p>
                  <span className="text-left text-xs font-semibold lg:text-base">
                    {currencyFormatter(item.sellPrice)}
                  </span>
                </div>
                <IconTrash stroke={2} className="cursor-pointer" />
              </div>
            ))
          ) : (
            <p>O carrinho está vazio!</p>
          )}
        </div>

        <Link
          to="/"
          className="text-center text-sm font-semibold text-gray-400 lg:text-lg"
        >
          Adicionar mais itens
        </Link>
      </SheetHeader>

      <div className="flex flex-col">
        <SheetHeader className="flex flex-col">
          <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
            Forma de Entrega
          </SheetTitle>
          <div className="flex items-center justify-between rounded-md bg-secondary py-2 pl-2 text-sm font-bold lg:text-lg">
            <p className="font-semibold">Retirada na Loja</p>
            <RadiobuttonIcon className="m-auto mx-5 text-primary" />
          </div>
        </SheetHeader>

        <SheetHeader className="mb-4 flex flex-col">
          <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
            Forma de Pagamento
          </SheetTitle>
          <div className="items-left flex flex-col justify-between gap-4 rounded-md bg-primary p-2 text-sm text-white lg:text-xl">
            <div className="flex items-center justify-between">
              <p>xxxx xxxx xxxx 0000</p>
              <div className="flex gap-2">
                <IconEdit stroke={2} className="cursor-pointer" />
                <IconTrash stroke={2} className="cursor-pointer" />
              </div>
            </div>
            <p className="text-left text-xs lg:text-lg">Nome do Titular</p>
          </div>
          <Link
            to="/"
            className="mt-2 flex items-center justify-start gap-2 rounded-md bg-secondary p-2 text-sm font-semibold lg:text-base"
          >
            <IconPlus stroke={2} />
            <p>Adicionar novo cartão</p>
          </Link>
        </SheetHeader>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-base font-bold lg:text-xl">
            <p>Subtotal</p>
            <span>{currencyFormatter(20.99)}</span>
          </div>
          <Button className="rounded-full border-gray-400 lg:p-5 lg:text-xl">
            Pagar agora
          </Button>
        </div>
      </div>
    </div>
  )
}
