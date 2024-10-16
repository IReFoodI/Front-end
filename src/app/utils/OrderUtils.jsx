import {
  IconAlertOctagon,
  IconCircleCheck,
  IconCircleX,
  IconHeart,
} from "@tabler/icons-react"

export function getStatus(order) {
  let iconInOrder
  let nameInStatusOrder

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

  return {
    icon: iconInOrder,
    status: nameInStatusOrder,
  }
}

export function groupItems(items) {
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
