import { IconClock } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import restaurantStore from "@/app/store/restaurantStore"
import useCartStore from "@/app/store/useCartStore"
import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"

import { finalizeOrder } from "../../../../app/utils/finalizeOrder"
import CardStore from "./CardStore"
import DeliveryAndPayment from "./DeliveryAndPayment"

export const OrderDetails = () => {
  const { cards } = userCardStore()
  const { cartItems } = useCartStore()
  const [pickupTime, setPickupTime] = useState("")
  const {
    fetchRestaurantInfo,
    restaurantInfo,
    fetchRestaurantHours,
    restaurantHours,
    fetchAddress,
    restaurantAddress,
  } = restaurantStore()
  const navigate = useNavigate()

  useEffect(() => {
    const initializeData = async () => {
      const firstProduct = cartItems[0]
      if (firstProduct?.productId) {
        await fetchRestaurantInfo(firstProduct.productId)
      }
    }

    initializeData()
  }, [fetchRestaurantInfo, cartItems])

  useEffect(() => {
    if (restaurantInfo) {
      fetchRestaurantHours(restaurantInfo.restaurantId)
      fetchAddress(restaurantInfo.restaurantId)
    }
  }, [restaurantInfo, fetchRestaurantHours, fetchAddress])

  useEffect(() => {
    if (restaurantHours) {
      const today = new Date()
      const dayOfWeek = today
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase()
      const todayHours = restaurantHours.find(
        (hour) => hour.dayOfWeek === dayOfWeek
      )

      setPickupTime(
        todayHours
          ? `Hoje, ${todayHours.openingTime} - ${todayHours.closingTime}`
          : "Restaurante fechado hoje"
      )
    }
  }, [restaurantHours])

  const restaurantAddressStandard =
    restaurantAddress?.find((address) => address.isStandard) || {}
  const encodedAddress = encodeURIComponent(
    `${restaurantAddressStandard.street || ""}, ${restaurantAddressStandard.number || ""}, ${restaurantAddressStandard.city || ""}`
  )

  const handleFinalizeOrder = () => finalizeOrder({ navigate })

  return (
    <div
      id="OrderDetails"
      className="mx-auto flex max-w-[460px] flex-col justify-between gap-8 px-10 lg:ps-5"
    >
      {/* CARD LOJA */}
      <div>
        <CardStore restaurantInfo={restaurantInfo} />
      </div>

      {/* RETIRADA */}
      <div>
        <h2 className="text-lg font-semibold text-primary lg:text-xl">
          Retirada
        </h2>
        <div className="flex items-center gap-3 text-2xl font-semibold text-gray-600">
          <IconClock />
          {pickupTime}
        </div>
      </div>

      {/* MAPA MOBILE */}
      <div className="mx-auto w-full max-w-[400px]">
        <h2 className="mb-1 text-lg font-semibold text-primary lg:text-xl">
          Retirar em:
        </h2>
        <div
          id="map"
          className="top-12 z-20 mx-auto flex items-center justify-center"
        >
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            className="rounded-xl border-0"
            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* FORMA DE ENTREGA E PAGAMENTO */}
      <div className="mx-auto w-full max-w-[400px]">
        <DeliveryAndPayment />
      </div>
      {/* BUTTON FINALIZAR */}
      <div className="mx-auto hidden w-full max-w-[400px] lg:block">
        <Button
          className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl"
          disabled={cards.length === 0}
          onClick={handleFinalizeOrder}
        >
          Finalizar
        </Button>
      </div>
    </div>
  )
}
