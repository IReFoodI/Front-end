import { IconAlertOctagon } from "@tabler/icons-react"
import { IconHeart } from "@tabler/icons-react"
import { IconCircleCheck } from "@tabler/icons-react"
import { IconCircleX } from "@tabler/icons-react"
import { IconCaretRightFilled } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"
import { Separator } from "@/ui/components/ui/separator"

export function OrderCard({ order }) {
  let iconInOrder
  let nameInStatusOrder

  // const order = {
  //   clientName: "Yasmin Carloto",
  //   orderNumber: 12345,
  //   items: [
  //     { itemId: 1, itemName: "Hambúrguer", price: 20.34 },
  //     { itemId: 1, itemName: "Hambúrguer", price: 24.56 },
  //     { itemId: 2, itemName: "Refrigerante", price: 5.2 },
  //   ],
  //   totalValue: 50.1,
  //   status: "pending",
  // }

  function groupItems(items) {
    let groupedItems = {}

    items.forEach((item) => {
      if (groupedItems[item.itemId]) {
        groupedItems[item.itemId].quantity += 1
        groupedItems[item.itemId].price += item.price
      } else {
        groupedItems[item.itemId] = { ...item, quantity: 1 }
      }
    })

    return Object.values(groupedItems)
  }

  const groupedItems = groupItems(order.items)

  function getStatus() {
    if (order.status == "pending") {
      iconInOrder = <IconAlertOctagon className="text-yellow-500" size={16} />
      nameInStatusOrder = "Pendente"
    } else if (order.status == "accepted") {
      nameInStatusOrder = "Aceito"
      iconInOrder = <IconHeart className="text-green-500" size={16} />
    } else if (order.status == "done") {
      nameInStatusOrder = "Concluído"
      iconInOrder = <IconCircleCheck className="text-blue-500" size={16} />
    } else {
      nameInStatusOrder = "Cancelado"
      iconInOrder = <IconCircleX className="text-red-500" size={16} />
    }
  }

  getStatus()

  return (
    <div className="border-b-2 border-gray-300 bg-gray-100 p-4">
      <div className="flex items-start justify-between pb-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{order.clientName}</h1>
          <p className="text-sm font-semibold">Pedido #{order.orderNumber}</p>
        </div>
        <Link to="" className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {iconInOrder}
            <p className="text-sm">{nameInStatusOrder}</p>
          </div>
          <IconCaretRightFilled size={16} />
        </Link>
      </div>
      <Separator />
      {groupedItems.map((item) => (
        <div key={item.itemId}>
          <div className="flex w-full justify-between py-2 font-semibold text-gray-600">
            <div className="flex items-center justify-between gap-1 text-lg">
              <span>{item.quantity}x</span>
              <p>{item.itemName}</p>
            </div>
            <p className="text-base">R$ {item.price}</p>
          </div>
          <Separator />
        </div>
      ))}
      <div className="flex w-full justify-between py-2 text-lg font-semibold">
        <p>Total</p>
        <p className="font-bold">R$ {order.totalValue}</p>
      </div>
      {order.status == "pending" && (
        <div className="flex justify-between pt-4">
          <Button>Aceitar Pedido</Button>
          <Button className="bg-gray-400 hover:bg-gray-500">
            Recusar Pedido
          </Button>
        </div>
      )}
    </div>
  )
}
