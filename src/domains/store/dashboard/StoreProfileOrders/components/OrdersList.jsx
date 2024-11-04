import { OrderCard } from "@/domains/store/dashboard/StoreProfileOrders/components/OrderCard"

export function OrdersList({
  orders,
  isDoneOrCanceled,
  setOrder,
  orderRef,
  setUser,
}) {
  return (
    <div>
      {orders?.map((order) => (
        <OrderCard
          key={order.orderId}
          order={order}
          isDoneOrCanceled={isDoneOrCanceled}
          setOrder={setOrder}
          orderRef={orderRef}
          setUser={setUser}
        />
      ))}
    </div>
  )
}
