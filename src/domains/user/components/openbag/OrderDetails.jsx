import { IconPaperBag } from "@tabler/icons-react"
import { useState } from "react"

import { StoreProductItem } from "@/domains/store/components/StoreProductItem"

import CardStore from "./CardStore"
import DeliveryAndPayment from "./DeliveryAndPayment"

export const OrderDetails = () => {
  const [showAllItems, setShowAllItems] = useState(false)

  const toggleShowAllItems = () => {
    setShowAllItems((prevState) => !prevState)
  }

  const [order] = useState({
    pickupTime: "Hoje, 19:52 - 20:02",
    orderStatus: "A Loja está separando seu pedido",
    restaurant: {
      name: "Dragão Verde",
      type: "Restaurante",
      imgUrl: "https://via.placeholder.com/40",
    },
    orderNumber: 3399,
    orderItems: [
      {
        name: "Item a venda",
        description: "Descrição do item a venda...",
        price: "20.99",
      },
    ],
    subtotal: "20.99",
    delivery: "Retirada na loja",
    payment: {
      method: "PIX",
      status: "aprovado",
    },
  })

  const products = [
    {
      id: 1,
      fullPrice: 60,
      price: 40.020202,
      name: "Combo Hamburguer",
      quantity: 10,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi possimus illum eveniet libero cumque, minima veniam excepturi deserunt totam sed.",
    },
    {
      id: 2,
      fullPrice: 40,
      price: 20,
      name: "Hamburguer",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 3,
      fullPrice: 40,
      price: 20,
      name: "Hamburguer",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 4,
      fullPrice: 40,
      price: 20,
      name: "Hamburguer",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 3,
      fullPrice: 40,
      price: 20,
      name: "Hamburguer",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 4,
      fullPrice: 40,
      price: 20,
      name: "Hamburguer",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 3,
      fullPrice: 40,
      price: 20,
      name: "Hamburguer",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
    {
      id: 4,
      fullPrice: 40,
      price: 20,
      name: "Hamburguer",
      quantity: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elitrunt totam sed.",
    },
  ]

  const itemsToDisplay = showAllItems ? products : products.slice(0, 2)

  const address =
    "Rua Visconde de Duprat, 258 - Petrópolis, Porto Alegre - RS, 90690-430"
  const encodedAddress = encodeURIComponent(address)
  return (
    <section>
      <div className="flex h-full flex-col lg:flex-row">
        <div className="flex flex-col justify-between px-10 lg:w-1/2 lg:flex-row lg:ps-5">
          <div className="flex-1">
            {/* CARD LOJA */}
            <CardStore />

            {/* RETIRADA */}
            <div className="mx-auto rounded-lg p-4 md:max-w-md">
              <div className="text-lg font-semibold text-primary">Retirada</div>
              <div className="text-2xl font-semibold text-secondary-foreground">
                {order.pickupTime}
              </div>
              <div className="mt-1 flex items-center">
                <IconPaperBag />
                <span className="ml-2 text-sm text-secondary-foreground">
                  {order.orderStatus}
                </span>
              </div>

              {/* MAPA MOBILE */}
              <div className="mt-4 text-lg font-semibold text-primary lg:hidden">
                Retirar em:
              </div>
              <div
                id="map"
                className="top-12 z-20 mx-auto flex items-center justify-center lg:hidden"
              >
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  className="rounded-xl border-0"
                  src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>

              {/* FORMA DE ENTREGA E PAGAMENTO PIX */}
              <DeliveryAndPayment />

              {/* CARD PRODUTO ITEM */}
              <div className="flex flex-col gap-4">
                {itemsToDisplay.map((product) => (
                  <StoreProductItem {...product} key={product.id} />
                ))}
                {products.length > 2 && (
                  <button
                    onClick={toggleShowAllItems}
                    className="mt-2 text-primary"
                  >
                    {showAllItems ? "Ver menos itens" : "Ver mais itens"}
                  </button>
                )}
              </div>
              {/* FIM */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
