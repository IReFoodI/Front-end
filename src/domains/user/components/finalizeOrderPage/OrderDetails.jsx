import { IconClock } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import restaurantStore from "@/app/store/restaurantStore"
import useCartStore from "@/app/store/useCartStore"
import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"

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

  useEffect(() => {
    const firstProduct = cartItems[0]

    if (firstProduct) {
      fetchRestaurantInfo(firstProduct.productId).then((restaurantId) => {
        if (restaurantId) {
          fetchRestaurantHours(restaurantId)
          fetchAddress(restaurantId)
        }
      })
    }
    console.log("novo login order details")
    console.log("first product => ", firstProduct)
    console.log("cart items => ", cartItems)
  }, [fetchRestaurantInfo, fetchRestaurantHours, fetchAddress, cartItems])

  useEffect(() => {
    if (restaurantHours && restaurantInfo) {
      const today = new Date()
      const dayOfWeek = today
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase()
      const hours = restaurantHours

      const todayHours = hours.find((hour) => hour.dayOfWeek === dayOfWeek)

      if (todayHours) {
        setPickupTime(
          `Hoje, ${todayHours.openingTime} - ${todayHours.closingTime}`
        )
      } else {
        setPickupTime("Restaurante fechado hoje")
      }
    }
  }, [restaurantHours, restaurantInfo])

  const restaurantAddressStandard =
    restaurantAddress?.find((address) => address.isStandard) || {}
  const encodedAddress = encodeURIComponent(
    `${restaurantAddressStandard.street || ""}, ${restaurantAddressStandard.number || ""}, ${restaurantAddressStandard.city || ""}`
  )

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
          <IconClock stroke={2} />
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
      {cards.length > 0 ? (
        <Link to="/pedidos" className="w-full">
          <div className="mx-auto hidden w-full max-w-[400px] lg:block">
            <Button className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl">
              Finalizar
            </Button>
          </div>
        </Link>
      ) : (
        <div className="mx-auto hidden w-full max-w-[400px] lg:block">
          <Button
            className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl"
            disabled
          >
            Finalizar
          </Button>
        </div>
      )}
    </div>
  )
}
