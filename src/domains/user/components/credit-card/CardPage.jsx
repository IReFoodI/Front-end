import { IconCreditCard } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"

import { SmallCard } from "./SmallCard"

const cardData = [
  {
    name: "Dalia Bezerra",
    number: "0000000000001234",
    validity: "06/25",
  },
  {
    name: "Hortência Flores",
    number: "1233 1233 1212 0000",
    validity: "11/35",
  },
  {
    name: "Isaac Flores",
    number: "1111 2222 3333 1554",
    validity: "09/38",
  },
]
export function CardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)
  const { cards, fetchCards, removeCard, isLoading, error } = userCardStore()

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleDeleteCard = (index) => {
    setSelectedCardIndex(index)
    toggleOpenModal()
  }

  const confirmDeleteCard = () => {
    if (selectedCardIndex !== null) {
      removeCard(selectedCardIndex)
      setSelectedCardIndex(null)
      toggleOpenModal()
    }
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[1216px] flex-col items-center gap-6 text-gray-600 antialiased lg:h-auto">
      <h1 className="w-full pb-6 text-center text-2xl font-semibold">
        Cartões
      </h1>

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col">
          {cards.length > 0 ? (
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-4">
              <div className="mx-auto mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((data, index) => (
                  <SmallCard
                    key={index}
                    data={data}
                    toggleOpenModal={() => handleDeleteCard(index)}
                  />
                ))}
              </div>
              <NavLink
                to={"/cartoes/adicionar"}
                className={"w-full text-center"}
              >
                <Button className="w-full max-w-[19rem] rounded-full px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out">
                  Adicionar novo cartão
                </Button>
              </NavLink>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <div className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center">
                <IconCreditCard size={45} />
                <h2 className="text-xl font-semibold">
                  Poxa, você ainda não possui cartões cadastrados
                </h2>
                <p className="w-[250px]">
                  Vamos adicionar seu primeiro cartão para fazer um novo pedido!
                </p>
                <NavLink to={"/cartoes/adicionar"}>
                  <Button className="w-full max-w-[19rem] rounded-full px-4 pt-11 text-base font-semibold transition-colors duration-300 ease-in-out">
                    Adicionar novo cartão
                  </Button>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={toggleOpenModal}>
        <DialogContent>
          <DialogTitle>Deseja realmente excluir este cartão?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente os
            dados do cartão.
          </DialogDescription>
          <DialogFooter>
            <Button
              className="rounded-full"
              variant="ghost"
              onClick={toggleOpenModal}
            >
              Cancelar
            </Button>
            <Button
              className="rounded-full"
              variant="destructive"
              onClick={confirmDeleteCard}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
