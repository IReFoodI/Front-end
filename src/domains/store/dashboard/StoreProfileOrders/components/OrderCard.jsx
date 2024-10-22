import { IconCaretRightFilled } from "@tabler/icons-react"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { getStatus, groupItems } from "@/app/utils/OrderUtils"
import { Button } from "@/ui/components/ui/button/button"
import { Separator } from "@/ui/components/ui/separator"

export function OrderCard({ order, isDoneOrCanceled, setOrder, orderRef }) {
  const groupedItems = groupItems(order.items)
  const status = getStatus(order)

  function onStatusButtonClick() {
    setOrder(order)
    orderRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className={`border-b-2 border-gray-300 bg-gray-100 p-4 ${isDoneOrCanceled ? "text-gray-500" : "text-black"}`}
    >
      <div className="flex items-start justify-between pb-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{order.client.clientName}</h1>
          <p className="text-sm font-semibold">Pedido #{order.orderNumber}</p>
        </div>

        <button
          className="flex items-center gap-3 rounded-md p-2 hover:bg-orange-200"
          onClick={() => onStatusButtonClick()}
        >
          <div className="flex h-full w-full items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {status.icon}
              <p className="text-sm">{status.status}</p>
            </div>
            <IconCaretRightFilled size={16} />
          </div>
        </button>
      </div>
      <Separator />
      {groupedItems.map((item) => (
        <div key={item.itemId}>
          <div
            className={`flex w-full justify-between py-2 font-semibold ${isDoneOrCanceled ? "text-gray-500" : "text-gray-600"}`}
          >
            <div className="flex items-center justify-between gap-1 text-lg">
              <span>{item.quantity}x</span>
              <p>{item.itemName}</p>
            </div>
            <p className="text-base">{currencyFormatter(item.price)}</p>
          </div>
          <Separator />
        </div>
      ))}
      <div className="flex w-full justify-between py-2 text-lg font-semibold">
        <p>Total</p>
        <p className="font-bold">{currencyFormatter(order.totalValue)}</p>
      </div>
      {order.status == "pending" && (
        <div className="flex w-full justify-around gap-1 pt-4">
          <Button className="w-1/2">Aceitar Pedido</Button>
          <Button className="w-1/2 bg-gray-400 hover:bg-gray-500">
            Recusar Pedido
          </Button>
        </div>
      )}
    </div>
  )
}