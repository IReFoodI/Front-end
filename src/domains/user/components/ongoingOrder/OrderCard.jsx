import { useState } from "react"

import { currencyFormatter } from "@/app/utils/currencyFormatter"

export function OrderCard({
  pickupTime,
  orderStatus,
  restaurantName,
  orderNumber,
  restaurantImage,
  orderItems,
  subtotal,
  deliveryMethod,
  paymentMethod,
  paymentStatus,
  encodedAddress,
}) {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleItemDescription = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="mx-auto rounded-lg p-4 md:max-w-md">
      <div className="text-lg font-semibold text-primary">
        Previsão para Retirada
      </div>
      <div className="text-2xl font-semibold text-secondary-foreground">
        {pickupTime}
      </div>
      <div className="mt-1 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m0 0a2 2 0 114 0v4m-4 4h4m-4 0a2 2 0 104 0h-4z"
          />
        </svg>
        <span className="ml-2 text-sm text-secondary-foreground">
          {orderStatus}
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
          src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
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
                src={restaurantImage}
                alt={restaurantName}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="font-semibold text-[#1E1F2B]">
                  {restaurantName}
                </div>
                <div className="text-sm text-secondary-foreground">
                  Restaurante
                </div>
              </div>
            </div>
            <div className="text-secondary-foreground">{orderNumber}</div>
          </div>

          {orderItems?.map((item, index) => (
            <div className="mt-4" key={index}>
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleItemDescription(index)}
              >
                <div className="text-[#1E1F2B]">{item.name}</div>
                <div className="text-[#1E1F2B]">
                  {currencyFormatter(item.price)}
                </div>
              </div>
              <div
                className={`mt-1 text-sm text-gray-400 ${expandedItems[index] ? "" : "line-clamp-1"}`}
              >
                {item.description}
              </div>
              {!expandedItems[index] && item.description.length > 50 && (
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
            <div className="font-semibold">{currencyFormatter(subtotal)}</div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-background p-2">
            <div className="pr-2 text-sm text-secondary-foreground">
              <span className="block">Forma de entrega:</span>
              <span className="block font-semibold">{deliveryMethod}</span>
            </div>
            <div className="flex flex-col items-center space-x-1">
              <span className="text-sm text-secondary-foreground">
                Pagamento:
              </span>
              <div className="flex items-center space-x-1">
                <span className="rounded bg-primary px-2 py-1 text-xs text-white">
                  {paymentMethod}
                </span>
                <span className="bg-primary-foregroun text-xs font-semibold text-primary">
                  {paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
