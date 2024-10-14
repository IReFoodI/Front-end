import { OrderCard } from "@/domains/store/components/StoreProfileOrders/components/OrderCard"

export function OrdersList({ orders }) {
  return (
    <div>
      {orders?.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  )
}
