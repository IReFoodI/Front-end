import { OrderCard } from "@/domains/store/components/StoreProfileOrders/components/OrderCard"

export function OrdersList({ orders, isDoneOrCanceled, setOrder, orderRef }) {
  return (
    <div>
      {orders?.map((order) => (
        <OrderCard
          key={order.orderId}
          order={order}
          isDoneOrCanceled={isDoneOrCanceled}
          setOrder={setOrder}
          orderRef={orderRef}
        />
      ))}
    </div>
  )
}
