/* eslint-disable */
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { IconShoppingBag } from "@tabler/icons-react"
import { useState } from "react"

import { cartService } from "@/app/service/cartService"
import useCartStore from "@/app/store/useCartStore"
import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { dateFormatterYearMonthDay } from "@/app/utils/dateFormatterYearMonthDay"
import imageBroke from "@/ui/assets/image-broke.png"
import { Badge } from "@/ui/components/ui/badge"
import { Button } from "@/ui/components/ui/button/button"
import { Card } from "@/ui/components/ui/card"

import Default_Product_Image from "../../../../ui/assets/image-broke.png"
import userStore from "../../stores/userStore"

export function SearchProductItem({
  product: {
    productId,
    nameProduct,
    descriptionProduct,
    urlImgProduct,
    originalPrice,
    sellPrice,
    expirationDate,
    quantity,
    restaurantName,
  },
}) {
  const { userId } = userStore()
  const { fetchCart } = useCartStore()
  const [amountAdded, setAmountAdded] = useState(1)
  const [newQuantity] = useState(quantity)

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

  const handleAddToCart = async () => {
    try {
      await cartService.addItemCart({
        userId,
        productId,
        quantity: amountAdded,
      })
      await fetchCart(userId)
      setAmountAdded(1)
      toast.success("Item adicionado com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao adicionar item no carrinho.")
    }
  }

  return (
    <Card className="flex flex-col items-center justify-start gap-4 bg-gray-100 p-3 border-none">
      <div className="flex w-full flex-1 items-start gap-6 md:gap-6">
        <div className="relative h-full w-24 rounded-lg md:rounded-[1.25rem]">
          <Badge className="absolute left-1/2 top-0 flex w-fit -translate-x-1/2 -translate-y-1/2 gap-0.5 px-0.5 py-0.5 font-semibold hover:bg-primary">
            <IconShoppingBag size={13} />
            <p className="text-[0.625rem] md:text-[0.8rem]">{newQuantity}</p>
            <p className="text-[0.625rem] md:text-[0.8rem]">disponíveis</p>
          </Badge>
          <div className="flex h-full items-center justify-center">
            <img
              src={urlImgProduct ? urlImgProduct : Default_Product_Image}
              alt={nameProduct}
              className="h-24 w-24 bg-cover bg-center rounded-md"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = Default_Product_Image
              }}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-lg font-semibold">{nameProduct}</h3>

          {/* Talvez colocar um truncate para não passar de um determinado número de linhas na descrição */}
          <p className="truncate text-xs text-gray-500 lg:text-sm">
            {restaurantName}
          </p>
          <p className="text-xs font-medium text-gray-400 lg:text-sm">
            {descriptionProduct}
          </p>
          <div>
            <p className="text-sm text-gray-500">
              Válido até: {dateFormatterYearMonthDay(new Date(expirationDate))}
            </p>
          </div>
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
