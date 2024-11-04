import {
  IconAlertOctagon,
  IconCircleCheck,
  IconCircleX,
  IconHeart,
} from "@tabler/icons-react"

export function getStatus(order) {
  let iconInOrder
  let nameInStatusOrder

  if (order.orderStatus == "ENVIADO") {
    // colocar PENDENTE
    iconInOrder = <IconAlertOctagon className="text-yellow-500" size={16} />
    nameInStatusOrder = "Pendente"
  } else if (order.orderStatus == "EMPRODUCAO") {
    nameInStatusOrder = "Aceito"
    iconInOrder = <IconHeart className="text-green-500" size={16} />
  } else if (order.orderStatus == "ENTREGUE") {
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
    if (groupedItems[item.productId]) {
      groupedItems[item.productId].quantity += 1
      groupedItems[item.productId].price += item.unitValue
    } else {
      groupedItems[item.productId] = { ...item, quantity: 1 }
    }
  })

  return Object.values(groupedItems)
}
