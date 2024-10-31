import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { currencyFormatter } from "@/app/utils/currencyFormatter"

const Orderitems = () => {
  const [showAllItems, setShowAllItems] = useState(false)

  const toggleShowAllItems = () => {
    setShowAllItems((prevState) => !prevState)
  }
  const products = [
    {
      id: 1,
      fullPrice: 60,
      price: 40.020202,
      name: "Combo Hamburguer",
      quantity: 3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      fullPrice: 40,
      price: 20,
      name: "Misto de Queijo",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 3,
      fullPrice: 40,
      price: 20,
      name: "Subway",
      quantity: 15,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 4,
      fullPrice: 40,
      price: 16,
      name: "Hotdog",
      quantity: 8,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 3,
      fullPrice: 40,
      price: 20,
      name: "Beirute",
      quantity: 2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
  ]

  let totalAmount = 151.79

  const itemsToDisplay = showAllItems ? products : products.slice(0, 2)

  return (
    <aside className="mx-auto flex max-w-[400px] flex-1 flex-col items-center gap-4 rounded-md border p-8 shadow-lg lg:gap-6">
      <div className="flex flex-1 flex-col gap-1">
        {/* CARD PRODUTO ITEM */}
        <div className="flex flex-col gap-4">
          {itemsToDisplay.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-md bg-secondary p-2 text-sm"
            >
              <div className="flex w-full items-center justify-between gap-5">
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm font-bold lg:text-lg">
                      {product.quantity}x {product.name}
                    </p>
                    <p>{product.description}</p>
                  </div>
                  <span className="text-left text-xs font-semibold lg:text-base">
                    {currencyFormatter(product.price)}
                  </span>
                </div>
                <div>
                  <IconTrash className="cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* VER MAIS */}
      {products.length > 2 && (
        <button onClick={toggleShowAllItems} className="mt-2 text-primary">
          {showAllItems ? "Ver menos itens" : "Ver mais itens"}
        </button>
      )}
      {/* ADD MAIS ITEMS */}
      <Link
        to="/"
        className="text-center text-sm font-semibold text-gray-400 lg:text-lg"
      >
        Adicionar mais itens
      </Link>
      {/* TOTAL */}
      <div className="p-4 text-center lg:text-right">
        <p className="text-lg font-semibold">
          Total: R$ {totalAmount.toFixed(2)}
        </p>
      </div>
    </aside>
  )
}

export default Orderitems
