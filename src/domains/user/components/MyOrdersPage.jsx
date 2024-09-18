import { IconShoppingBag } from "@tabler/icons-react"

// import { Button } from "./Button"
import { Button } from "@/ui/components/ui/button/button"

import { CardItem } from "./CardItem"

const cardData = [
  {
    date: "Ter 06 agosto 2024",
    name: "Dragão Verde",
    type: "Restaurante",
    orderNumber: 3399,
    items: 1,
    itemName: "Item a venda",
    price: 40.0,
    rating: 4,
    imgUrl: "https://placehold.co/100x100",
  },
  {
    date: "Qua 07 agosto 2024",
    name: "Leão Dourado",
    type: "Pizzaria",
    orderNumber: 4455,
    items: 2,
    itemName: "Pizza grande",
    price: 80.0,
    rating: 5,
    imgUrl: "https://placehold.co/100x100",
  },
  {
    date: "Qui 08 agosto 2024",
    name: "Lótus Azul",
    type: "Café",
    orderNumber: 1122,
    items: 3,
    itemName: "Café especial",
    price: 15.0,
    rating: 3,
    imgUrl: "https://placehold.co/100x100",
  },
]
export function MyOrdersPage() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
      <h1 className="mt-5 w-full pb-6 pt-7 text-center text-2xl font-semibold lg:py-10">
        Meus Pedidos
      </h1>

      <div className="flex w-full flex-col items-start px-8">
        <div className="flex w-full flex-col">
          {cardData.length > 0 ? (
            <>
              <h2 className="my-8 text-center font-semibold text-orange-500 lg:px-24 lg:text-start">
                Histórico
              </h2>
              <div className="mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cardData.map((data, index) => (
                  <CardItem key={index} data={data} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <div className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center">
                <IconShoppingBag size={45} />
                <h2 className="text-xl font-semibold">
                  Você ainda não fez pedidos!
                </h2>
                <p className="w-[250px]">
                  explore as lojas e tire a barriga da miséria hoje mesmo!
                </p>
                <Button className="w-full rounded-full px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out">
                  explorar agora!
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
