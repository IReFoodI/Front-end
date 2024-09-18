import {
  IconCaretRightFilled,
  IconCheck,
  IconStarFilled,
} from "@tabler/icons-react"

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
  return (
    <div className="w-full min-w-[320px] p-3 text-sm font-semibold">
      <p className="py-2">{data.date}</p>
      <div className="flex items-center justify-between rounded-t-lg border-b bg-gray-100 p-2 px-4">
        <div className="flex gap-3">
          <img
            src={data.imgUrl}
            alt={data.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="text-xl">{data.name}</p>
            <p className="text-gray-400">{data.type}</p>
          </div>
        </div>
        <div>
          <IconCaretRightFilled />
        </div>
      </div>
      <div className="border-b bg-gray-100 p-2 px-4">
        <div className="flex items-center gap-1">
          <span className="text-green-500">
            <IconCheck />
          </span>
          Pedido concluído • #{data.orderNumber}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl">
            {data.items}x {data.itemName}
          </p>
          <p className="text-orange-500">R$ {data.price.toFixed(2)}</p>
        </div>
      </div>
      <button className="flex w-full items-center justify-between border-b bg-gray-100 p-2 px-4">
        <p className="">Avalie o pedido</p>
        <span className="flex gap-2">{renderStars(data.rating)}</span>
      </button>
      <div className="rounded-b-lg bg-gray-100 p-2 text-center">
        <button className="text-orange-500">Ajuda</button>
      </div>
    </div>
  )
}
