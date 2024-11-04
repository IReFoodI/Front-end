import { IconCaretRightFilled } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { getStatus, groupItems } from "@/app/utils/OrderUtils"
import { restaurantService } from "@/domains/store/services/restaurantService"
import { userService } from "@/domains/user/services/userService"
import { Button } from "@/ui/components/ui/button/button"
import { Loading } from "@/ui/components/ui/loading"
import { Separator } from "@/ui/components/ui/separator"

export function OrderCard({
  order,
  isDoneOrCanceled,
  setOrder,
  orderRef,
  setUser,
}) {
  const [orderItems, setOrderItems] = useState([])
  const [productNames, setProductNames] = useState({})
  const [user, setUserData] = useState()
  const status = getStatus(order)
  const [totalValue, setTotalValue] = useState(0)

  function onStatusButtonClick() {
    setOrder(order)
    setUser(user)
    orderRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const { onRequest } = useFetch()

  const fetchUserData = async () => {
    await onRequest({
      request: () => userService.getUserById(order.userId),
      onSuccess: (data) => {
        setUserData(data)
      },
    })
  }

  const fetchOrderItems = async () => {
    await onRequest({
      request: () => restaurantService.getOrderItems(),
      onSuccess: (data) => {
        const orderItemsPerOrder = data.filter(
          (orderItem) => orderItem.orderId == order.orderId
        )
        setOrderItems(orderItemsPerOrder)
        setTotalValue(
          orderItemsPerOrder.reduce(
            (acc, currValue) => acc + currValue.subtotal,
            0
          )
        )
      },
    })
  }

  useEffect(() => {
    fetchOrderItems()
    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchProductsById = async () => {
      let names = {}

      orderItems?.map(async (item) => {
        const productId = item.productId
        await onRequest({
          request: () => restaurantService.getProductById(productId),
          onSuccess: (data) => {
            names[productId] = data.nameProd
          },
        })
      })
      setProductNames(names)
    }

    fetchProductsById()
  }, [orderItems, onRequest])

  if (!orderItems || !user) {
    return <Loading />
  }
  return (
    <div
      className={`border-b-2 border-gray-300 bg-gray-100 p-4 ${isDoneOrCanceled ? "text-gray-500" : "text-black"}`}
    >
      <div className="flex items-start justify-between pb-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-sm font-semibold">Pedido #{order.orderId}</p>
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
      {orderItems?.map((item) => (
        <div key={item.productId}>
          <div
            className={`flex w-full justify-between py-2 font-semibold ${isDoneOrCanceled ? "text-gray-500" : "text-gray-600"}`}
          >
            <div className="flex items-center justify-between gap-4 text-base">
              <span>{item.quantity}x</span>
              {/* itens do pedido não possuem nome */}
              <p>{productNames[item.productId] || "Carregando..."}</p>
            </div>
            <p className="text-base">{currencyFormatter(item.subtotal)}</p>
          </div>
          <Separator />
        </div>
      ))}
      <div className="flex w-full justify-between py-2 text-lg font-semibold">
        <p>Total</p>
        <p className="font-bold">{currencyFormatter(totalValue)}</p>
      </div>
      {/* Substituir por PENDENTE */}
      {order.orderStatus == "ENVIADO" && (
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
