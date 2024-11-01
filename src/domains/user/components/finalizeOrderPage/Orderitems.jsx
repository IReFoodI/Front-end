import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { currencyFormatter } from "@/app/utils/currencyFormatter"

import useCartStore from "../../../../app/store/useCartStore"

const Orderitems = () => {
  const [showAllItems, setShowAllItems] = useState(false)

  const { cartItems, subtotal, removeItemFromCart } = useCartStore()

  const toggleShowAllItems = () => {
    setShowAllItems((prevState) => !prevState)
  }

  const itemsToDisplay = showAllItems ? cartItems : cartItems.slice(0, 2)

  return (
    <aside className="mx-auto flex max-w-[400px] flex-1 flex-col items-center gap-4 rounded-md border p-8 shadow-lg lg:gap-6">
      <div className="flex flex-1 flex-col gap-1">
        {/* CARD PRODUTO ITEM */}
        <div className="flex flex-col gap-4">
          {itemsToDisplay.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between rounded-md bg-secondary p-2 text-sm"
            >
              <div className="flex w-full items-center justify-between gap-5">
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm font-bold lg:text-lg">
                      {item.quantity}x {item.nameProduct}
                    </p>
                    <p>{item.descriptionProduct}</p>
                  </div>
                  <span className="text-left text-xs font-semibold lg:text-base">
                    {currencyFormatter(item.unitValue)}
                  </span>
                </div>
                <div>
                  <IconTrash
                    className="cursor-pointer"
                    onClick={() => removeItemFromCart(item.productId)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* VER MAIS */}
      {cartItems.length > 2 && (
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
        <p className="text-lg font-semibold">Total: R$ {subtotal}</p>
      </div>
    </aside>
  )
}

export default Orderitems
