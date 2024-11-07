import { useEffect } from "react"

import background from "@/ui/assets/background.png"

import restaurantStore from "../../../../app/store/restaurantStore"
import useOrderStore from "../../../../app/store/userOrderStore"
import userStore from "../../../user/stores/userStore"
import { OrderCard } from "./OrderCard"

export function OngoingOrder() {
  const { orderOnGoing, fetchOrders } = useOrderStore()
  const {
    restaurantHours,
    restaurantAddress,
    fetchRestaurantHours,
    fetchAddress,
  } = restaurantStore()
  const { userId } = userStore()

  useEffect(() => {
    fetchOrders(userId)
  }, [fetchOrders, userId])

  // useEffect(() => {
  //   console.log(orderOnGoing)
  // }, [orderOnGoing])

  useEffect(() => {
    if (orderOnGoing.length > 0) {
      const restaurantId = orderOnGoing[0].restaurantId
      fetchRestaurantHours(restaurantId)
      fetchAddress(restaurantId)
    }
  }, [orderOnGoing, fetchRestaurantHours, fetchAddress])

  const getPickupTime = () => {
    if (restaurantHours) {
      const today = new Date()
      const dayOfWeek = today
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase()
      const todayHours = restaurantHours.find(
        (hour) => hour.dayOfWeek === dayOfWeek
      )
      return todayHours
        ? `Hoje, ${todayHours.openingTime} - ${todayHours.closingTime}`
        : "Restaurante fechado hoje"
    }
    return ""
  }

  return (
    <>
      <h2 className="my-8 w-full text-left font-semibold text-orange-500 lg:px-32 lg:text-start">
        Pedido em andamento
      </h2>
      {orderOnGoing.map((order, index) => {
        const encodedAddress = encodeURIComponent(
          `${restaurantAddress?.street || ""}, ${restaurantAddress?.number || ""}, ${restaurantAddress?.city || ""}`
        )

        return (
          <div key={index} className="mb-11 flex h-full flex-col md:flex-row">
            <div className="flex flex-col justify-between px-10 lg:w-1/2 lg:ps-5">
              <OrderCard
                key={order.orderId}
                pickupTime={getPickupTime()}
                orderStatus={order.orderStatus}
                restaurantName={order.restaurantName}
                orderNumber={order.orderId}
                restaurantImage={order.restaurantLogo}
                orderItems={order.orderItems}
                subtotal={order.totalValue}
                deliveryMethod="Retirada na loja"
                paymentMethod="CARD"
                paymentStatus="Aprovado"
                encodedAddress={encodedAddress}
              />
            </div>
            <div className="relative flex justify-end text-center">
              <img
                className="z-2 hidden max-h-[700px] w-[80%] md:relative md:block"
                src={background}
                alt=""
              />
              <div
                id="map"
                className="z-2 top-12 mx-auto hidden w-[80%] items-center justify-center md:absolute md:left-0 md:flex md:h-[80%]"
              >
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  className="rounded-xl border-0"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(orderOnGoing[0]?.address)}&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
