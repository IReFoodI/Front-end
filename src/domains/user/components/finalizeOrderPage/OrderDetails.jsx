import { IconClock } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import userCardStore from "@/app/store/userCardStore"
import { getEncodedAddress } from "@/app/utils/encodeAddress"
import { Button } from "@/ui/components/ui/button/button"

import CardStore from "./CardStore"
import DeliveryAndPayment from "./DeliveryAndPayment"

export const OrderDetails = ({
  cartItemsWithRestaurant,
  handleFinalizeOrder,
}) => {
  const { cards } = userCardStore()
  const [pickupTime, setPickupTime] = useState("")

  useEffect(() => {
    setPickupTime(
      cartItemsWithRestaurant?.restaurant?.timesOfTheDay
        ? `Hoje, ${cartItemsWithRestaurant?.restaurant?.timesOfTheDay?.openingTime} - ${cartItemsWithRestaurant?.restaurant?.timesOfTheDay?.closingTime}`
        : "Restaurante fechado hoje"
    )
  }, [cartItemsWithRestaurant?.restaurant?.timesOfTheDay])

  return (
    <div
      id="OrderDetails"
      className="mx-auto flex max-w-[460px] flex-col justify-between gap-8 px-10 lg:ps-5"
    >
      {/* CARD LOJA */}
      <div>
        <CardStore restaurantInfo={cartItemsWithRestaurant?.restaurant} />
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
            src={`https://www.google.com/maps?q=${getEncodedAddress(cartItemsWithRestaurant?.restaurant?.address)}&output=embed`}
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
