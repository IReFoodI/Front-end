import {
  IconCaretRightFilled,
  IconCheck,
  IconStarFilled,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

import reviewService from "@/app/service/reviewService"
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/ui/components/ui/alert-dialog"

import { ReviewModal } from "./ReviewModal"

function renderStars(rating) {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <IconStarFilled
        key={i}
        size={15}
        className={i < rating ? "text-orange-500" : "text-gray-300"}
      />
    )
  }
  return stars
}

export function CardItem({ data }) {
  const orderDate = new Date(data.orderDate)
  const [review, setReview] = useState(null)

  useEffect(() => {
    async function fetchReview() {
      try {
        const response = await reviewService.getReviewByOrderId(data.orderId)
        setReview(response)
      } catch (error) {
        console.error("Erro ao buscar a avaliação:", error)
      }
    }
    fetchReview()
  }, [data.orderId])

  const formattedDate = orderDate.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  const formattedOrderId = String(data.orderId).padStart(4, "0")

  // Garantir que os itens do pedido sejam válidos
  const formattedOrderItems =
    data.orderItems?.map((item) => ({
      name: item.productName,
      quantity: item.quantity,
    })) || []

  // Exibir o primeiro item e indicar quantos itens a mais há
  const mainItem =
    formattedOrderItems.length > 0
      ? formattedOrderItems[0]
      : { name: "Nenhum item", quantity: 0 }
  const additionalItemsCount = Math.max(formattedOrderItems.length - 1, 0)

  const itemsText =
    formattedOrderItems.length > 0
      ? additionalItemsCount > 0
        ? `${mainItem.quantity}x ${mainItem.name} + ${additionalItemsCount} itens`
        : `${mainItem.quantity}x ${mainItem.name}`
      : "Nenhum item no pedido"

  return (
    <div className="flex w-full min-w-[320px] flex-1 flex-col p-3 text-sm font-semibold">
      <p className="py-2">{formattedDate}</p>
      <div className="flex items-center justify-between rounded-t-lg border-b bg-gray-100 p-2 px-4">
        <div className="flex gap-3">
          <img
            src={data.restaurantLogo}
            alt={data.restaurantName}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="text-xl">{data.restaurantName}</p>
            <p className="text-gray-400">{data.restaurantCategory}</p>
          </div>
        </div>
        <div>
          <IconCaretRightFilled />
        </div>
      </div>
      <div className="flex flex-1 flex-col border-b bg-gray-100 p-2 px-4">
        <div className="flex items-center gap-1">
          <span className="text-green-500">
            <IconCheck />
          </span>
          Pedido {data.orderStatus} • #{formattedOrderId}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl">{itemsText}</p>
        </div>
      </div>
      <div className="border-b bg-gray-100 p-2 text-center">
        <p className="text-xl text-primary">
          Total R$ {data.totalValue.toFixed(2)}
        </p>
      </div>
      {review && review.ratingNote ? (
        <div className="flex w-full items-center justify-between rounded-b-lg bg-gray-100 p-2 px-4">
          <p className="">Pedido avaliado</p>
          <span className="flex gap-2">{renderStars(review.ratingNote)}</span>
        </div>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger
            variant="ghost"
            className="flex w-full items-center justify-between rounded-none bg-gray-100 p-2 px-4"
          >
            <p>Avalie o pedido</p>
          </AlertDialogTrigger>
          <ReviewModal />
        </AlertDialog>
      )}
    </div>
  )
}
