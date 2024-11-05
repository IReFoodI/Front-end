import { OngoingOrder } from "./OngoingOrder"
import OrderHistory from "./OrderHistory"

export function MyOrdersPage() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
      <h1 className="mt-5 w-full pb-6 text-center text-2xl font-semibold">
        Meus Pedidos
      </h1>
      <OngoingOrder />
      <OrderHistory />
    </div>
  )
}
