import { IconPaperBag } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import background from "@/ui/assets/background.png"
import imageBroke from "@/ui/assets/image-broke.png"

export function OrderCard({
  index,
  data: {
    addressDetails,
    deliveryType,
    orderId,
    orderItems,
    orderStatus,
    restaurantLogo,
    restaurantName,
    totalValue,
    timesOfTheDay,
  },
}) {
  const [expandedItems, setExpandedItems] = useState({})
  const toggleItemDescription = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  useEffect

  const getPickupTime = () => {
    if (timesOfTheDay) {
      return timesOfTheDay
        ? `Hoje, ${timesOfTheDay.openingTime} - ${timesOfTheDay.closingTime}`
        : "Restaurante fechado hoje"
    }
  }

  function getEncodedAddress(address) {
    return encodeURIComponent(
      `${address?.street}, ${address?.number || ""} - ${address?.district || ""}, ${address?.city || ""} - ${address?.state || ""}, ${address?.cep || ""}`
    )
  }

  const formattedOrderId = String(orderId).padStart(4, "0")

  return (
    <div
      key={index}
      className="mb-11 grid h-full gap-12 sm:grid-cols-2 md:flex-row"
    >
      <div className="flex flex-col justify-between pl-10 lg:ps-5">
        <div className="mx-auto w-full rounded-lg p-4">
          <div className="text-lg font-semibold text-primary">
            Previsão para Retirada
          </div>
          <div className="text-2xl font-semibold text-secondary-foreground">
            {getPickupTime()}
          </div>
          <div className="mt-1 flex items-center">
            <IconPaperBag />
            <span className="ml-2 text-sm text-secondary-foreground">
              Status: <span className="font-medium">{orderStatus}</span>
            </span>
          </div>
          <div className="mt-4 text-lg font-semibold text-primary md:hidden">
            Retirar em:
          </div>
          <div
            id="map"
            className="top-12 z-20 mx-auto flex items-center justify-center md:hidden"
          >
            <iframe
              title="Google Maps"
              width="100%"
              height="100%"
              className="rounded-xl border-0"
              src={`https://www.google.com/maps?q=${getEncodedAddress(addressDetails)}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-6">
            <div className="text-lg font-semibold text-primary">
              Detalhes do Pedido
            </div>
            <div className="mt-2 rounded-lg bg-[#F8F9FE] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={restaurantLogo || imageBroke}
                    alt={restaurantName}
                    className="h-10 w-10 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = imageBroke
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-700">
                      {restaurantName}
                    </div>
                    <div className="text-sm text-secondary-foreground">
                      Restaurante
                    </div>
                  </div>
                </div>
                <div className="text-secondary-foreground">
                  #{formattedOrderId}
                </div>
              </div>

              {orderItems?.map((item, index) => (
                <div className="mt-4" key={index}>
                  <div
                    className="flex cursor-pointer items-start justify-between gap-2"
                    onClick={() => toggleItemDescription(index)}
                  >
                    <div className="text-gray-700">{item.quantity}x</div>
                    <p
                      title={item.productName}
                      className="w-full truncate text-gray-700"
                    >
                      {item.productName}
                    </p>
                    <div className="text-gray-700">
                      {currencyFormatter(item.unitValue * item.quantity)}
                    </div>
                  </div>
                  <div
                    className={`mt-1 text-sm text-gray-400 ${
                      expandedItems[index] ? "" : "truncate"
                    }`}
                    title={item.description}
                  >
                    {item.description}
                  </div>
                  {!expandedItems[index] && item.description?.length > 50 && (
                    <button
                      onClick={() => toggleItemDescription(index)}
                      className="mt-1 text-xs text-primary"
                    >
                      Ver mais
                    </button>
                  )}
                  {expandedItems[index] && (
                    <button
                      onClick={() => toggleItemDescription(index)}
                      className="mt-1 text-xs text-primary"
                    >
                      Ver menos
                    </button>
                  )}
                </div>
              ))}

              <div className="mt-4 flex justify-between rounded-lg bg-background p-2">
                <div className="font-semibold">Subtotal</div>
                <div className="font-semibold">
                  {currencyFormatter(totalValue)}
                </div>
              </div>

              <div className="mt-4 grid gap-2 rounded-lg bg-background p-2">
                <div className="flex gap-2 pr-2 text-sm text-secondary-foreground">
                  <span className="block">Forma de entrega:</span>
                  <span className="block font-semibold">{deliveryType}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm text-secondary-foreground">
                    Pagamento:
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="rounded bg-primary px-2 py-1 text-xs text-white">
                      Cartão
                    </span>
                    <span className="bg-primary-foregroun text-xs font-semibold text-primary">
                      {/* {paymentStatus} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex justify-end text-center">
        <img
          className="z-2 hidden max-h-[700px] w-[80%] md:relative md:block"
          src={background}
          alt=""
        />
        <div
          id="map"
          className="z-2 absolute top-12 mx-auto hidden w-[90%] items-center justify-center md:left-0 md:flex md:h-[80%]"
        >
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            className="rounded-xl border-0"
            src={`https://www.google.com/maps?q=${getEncodedAddress(addressDetails)}&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
