import { IconClock } from "@tabler/icons-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

import restaurantStore from "@/app/store/restaurantStore"
import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"

import CardStore from "./CardStore"
import DeliveryAndPayment from "./DeliveryAndPayment"

export const OrderDetails = () => {
  const { cards } = userCardStore()
  const { restaurantInfo, fetchRestaurantInfo } = restaurantStore()

  const pickupTime = "Hoje, 19:52 - 20:02"
  const address =
    "Rua Visconde de Duprat, 258 - Petrópolis, Porto Alegre - RS, 90690-430"

  const encodedAddress = encodeURIComponent(address)

  useEffect(() => {
    fetchRestaurantInfo(9)
  }, [fetchRestaurantInfo])

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
