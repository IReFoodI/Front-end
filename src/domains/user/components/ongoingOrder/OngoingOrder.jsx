import { useState } from "react"

import background from "@/ui/assets/background.png"

import { OrderCard } from "./OrderCard"

export function OngoingOrder() {
  const [order] = useState({
    pickupTime: "Hoje, 19:52 - 20:02",
    orderStatus: "A Loja está separando seu pedido",
    restaurant: {
      name: "Dragão Verde",
      type: "Restaurante",
      imgUrl: "https://via.placeholder.com/40",
    },
    orderNumber: 3399,
    orderItems: [
      {
        name: "Item a venda",
        description: "Descrição do item a venda...",
        price: "20.99",
      },
    ],
    subtotal: "20.99",
    delivery: "Retirada na loja",
    payment: {
      method: "PIX",
      status: "aprovado",
    },
  })

  const address =
    "Rua Visconde de Duprat, 258 - Petrópolis, Porto Alegre - RS, 90690-430"
  const encodedAddress = encodeURIComponent(address)

  return (
    <div
      id="page"
      className="mx-auto flex h-screen w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto"
    >
      <div className="flex h-full flex-col md:flex-row">
        <div className="flex flex-col justify-between px-10 lg:w-1/2 lg:ps-5">
          <div className="flex-1">
            <OrderCard
              pickupTime={order.pickupTime}
              orderStatus={order.orderStatus}
              restaurantName={order.restaurant.name}
              orderNumber={`#${order.orderNumber}`}
              restaurantImage={order.restaurant.imgUrl}
              orderItems={order.orderItems}
              subtotal={order.subtotal}
              deliveryMethod={order.delivery}
              paymentMethod={order.payment.method}
              paymentStatus={order.payment.status}
              encodedAddress={encodedAddress}
            />
          </div>
        </div>
        <div className="relative flex justify-end text-center">
          <img
            className="z-10 hidden max-h-[700px] w-[80%] md:relative md:block"
            src={background}
            alt=""
          />

          <div
            id="map"
            className="top-12 z-20 mx-auto hidden w-[80%] items-center justify-center md:absolute md:left-0 md:flex md:h-[80%]"
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
      </div>
    </div>
  )
}
