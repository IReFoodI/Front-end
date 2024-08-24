import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { IconShoppingBag } from "@tabler/icons-react"
import { useState } from "react"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { Badge } from "@/ui/components/ui/badge"
import { Button } from "@/ui/components/ui/button"
import { Card } from "@/ui/components/ui/card"

import image from "./foto-produto.png"

const StoreProductItem = ({
  fullPrice = 60,
  price = 40.020202,
  name = "Combo Hamburguer",
  quantity = 10,
  imageUrl = image,
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi possimus illum eveniet libero cumque, minima veniam excepturi deserunt totam sed.",
}) => {
  const [amountAdded, setAmountAdded] = useState(1)

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

  return (
    <Card className="flex items-center justify-start gap-3 bg-zinc-100 p-2">
      <div className="relative w-24 rounded-lg md:rounded-[1.25rem]">
        <Badge className="absolute left-1/2 top-0 flex w-fit -translate-x-1/2 -translate-y-1/2 gap-0.5 px-0.5 py-0.5 font-semibold">
          <IconShoppingBag size={12} />
          <p className="text-[0.625rem]">{quantity}</p>
          <p className="text-[0.625rem]">disponíveis</p>
        </Badge>
        <img
          src={imageUrl}
          alt={name}
          className="h-24 w-24 bg-cover bg-center"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-semibold">{name}</h3>
        {/* Talvez colocar um truncate para não passar de um determinado número de linhas na descrição */}
        <p className="text-xs font-medium text-zinc-400 lg:text-sm">
          {description}
        </p>

        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold text-zinc-400 line-through lg:text-sm">
              {currencyFormatter(fullPrice)}
            </p>
            <p className="text-lg font-semibold text-primary">
              {currencyFormatter(price)}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
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
    </Card>
  )
}

export default StoreProductItem
