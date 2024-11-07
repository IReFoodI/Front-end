import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { IconShoppingBag } from "@tabler/icons-react"
import { useState } from "react"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { Badge } from "@/ui/components/ui/badge"
import { Button } from "@/ui/components/ui/button/button"
import { Card } from "@/ui/components/ui/card"

import { useCartStore } from "../hooks/useCartStore"

export function StoreProductItem({
  originalPrice,
  sellPrice,
  nameProd,
  quantity,
  urlImgProd,
  descriptionProd,
}) {
  const addToCart = useCartStore((state) => state.addToCart)

  const [amountAdded, setAmountAdded] = useState(1)
  const [newQuantity, setNewQuantity] = useState(quantity)

  const handleIncreaseProductQuantity = () => {
    setAmountAdded((amountAdded) => {
      if (amountAdded < quantity) {
        return amountAdded + 1
      }
      return amountAdded
    })
  }

  const handleDecreaseProductQuantity = () => {
    setAmountAdded((amountAdded) => {
      if (amountAdded > 1) {
        return amountAdded - 1
      }
      return amountAdded
    })
  }

  const productToCart = {
    amountAdded,
    nameProd,
    sellPrice,
  }

  const handleAddToCart = () => {
    addToCart(productToCart)
    const cart = useCartStore.getState().cart
    setNewQuantity(newQuantity - amountAdded)
  }

  return (
    <Card className="flex flex-col items-center justify-start gap-4 bg-gray-100 p-3">
      <div className="flex items-start gap-6 md:gap-2">
        <div className="relative w-24 rounded-lg md:rounded-[1.25rem]">
          <Badge className="absolute left-1/2 top-0 flex w-fit -translate-x-1/2 -translate-y-1/2 gap-0.5 px-0.5 py-0.5 font-semibold hover:bg-primary">
            <IconShoppingBag size={13} />
            <p className="text-[0.625rem] md:text-[0.8rem]">{newQuantity}</p>
            <p className="text-[0.625rem] md:text-[0.8rem]">disponíveis</p>
          </Badge>
          <img
            src={urlImgProd}
            alt={nameProd}
            className="h-24 w-24 bg-cover bg-center"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-lg font-semibold">{nameProd}</h3>
          {/* Talvez colocar um truncate para não passar de um determinado número de linhas na descrição */}
          <p className="text-xs font-medium text-gray-400 lg:text-sm">
            {descriptionProd}
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold text-gray-400 line-through lg:text-sm">
                {currencyFormatter(originalPrice)}
              </p>
              <p className="text-lg font-semibold text-primary">
                {currencyFormatter(sellPrice)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 md:ml-2">
              <Button
                onClick={handleDecreaseProductQuantity}
                variant="ghost"
                className="px-2"
              >
                <MinusIcon />
              </Button>
              <p className="flex min-w-5 justify-center text-2xl font-semibold md:min-w-7 md:text-xl">
                {amountAdded}
              </p>
              <Button
                onClick={handleIncreaseProductQuantity}
                variant="ghost"
                className="px-2"
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleAddToCart} className="w-full md:w-[70%]">
        Adicionar ao Carrinho
      </Button>
    </Card>
  )
}
