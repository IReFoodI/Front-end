import { useState } from "react"

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
}) {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleItemDescription = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="mx-auto max-w-md rounded-lg p-4 md:bg-[#FFF8F5]">
      <div className="text-sm font-semibold text-[#FB3D01]">
        Previsão para Retirada
      </div>
      <div className="text-2xl font-semibold text-[#1E1F2B]">{pickupTime}</div>
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
        <span className="ml-2 text-sm text-gray-500">{orderStatus}</span>
      </div>

      <div className="mt-6">
        <div className="text-lg font-semibold text-[#FB3D01]">
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
                <div className="text-sm text-gray-500">Restaurante</div>
              </div>
            </div>
            <div className="text-gray-500">{orderNumber}</div>
          </div>

          {orderItems.map((item, index) => (
            <div className="mt-4" key={index}>
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleItemDescription(index)}
              >
                <div className="text-[#1E1F2B]">{item.name}</div>
                <div className="text-[#1E1F2B]">{item.price}</div>
              </div>
              <div
                className={`mt-1 text-sm text-gray-400 ${expandedItems[index] ? "" : "line-clamp-1"}`}
              >
                {item.description}
              </div>
              {!expandedItems[index] && item.description.length > 50 && (
                <button
                  onClick={() => toggleItemDescription(index)}
                  className="mt-1 text-xs text-[#FB3D01]"
                >
                  Ver mais
                </button>
              )}
              {expandedItems[index] && (
                <button
                  onClick={() => toggleItemDescription(index)}
                  className="mt-1 text-xs text-[#FB3D01]"
                >
                  Ver menos
                </button>
              )}
            </div>
          ))}

          <div className="mt-4 flex justify-between rounded-lg bg-background p-2">
            <div className="font-semibold">Subtotal</div>
            <div className="font-semibold">{subtotal}</div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-background p-2">
            <div className="pr-2 text-sm text-gray-500">
              <span className="block">Forma de entrega:</span>
              <span className="block font-semibold">{deliveryMethod}</span>
            </div>
            <div className="flex flex-col items-center space-x-1">
              <span className="text-sm text-gray-500">Pagamento:</span>
              <div className="flex items-center space-x-1">
                <span className="rounded bg-[#FB3D01] px-2 py-1 text-xs text-white">
                  {paymentMethod}
                </span>
                <span className="bg-primary-foregroun text-xs font-semibold text-[#FB3D01]">
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
