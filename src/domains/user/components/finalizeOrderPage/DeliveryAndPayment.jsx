import { Dialog } from "@radix-ui/react-dialog"
import { RadiobuttonIcon } from "@radix-ui/react-icons"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"
import { SheetHeader, SheetTitle } from "@/ui/components/ui/sheet"
const DeliveryAndPayment = () => {
  const { cards, fetchCards, removeCard, isLoading, error } = userCardStore()
  const [selectedCard, setSelectedCard] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardToDelete, setCardToDelete] = useState(null)

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCard(cards[0].cardId)
    }
  }, [cards])

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId)
  }

  const handleCardDelete = async () => {
    if (cardToDelete) {
      await removeCard(cardToDelete)
      setIsModalOpen(false)
      setCardToDelete(null)
      fetchCards()
    }
  }

  const handleOpenModal = (cardId) => {
    setCardToDelete(cardId)
    setIsModalOpen(true)
  }

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  return (
    <div className="flex flex-col gap-8">
      <Dialog>
        {/* ENTREGA */}
        <SheetHeader className="flex flex-col">
          <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
            Forma de Entrega
          </SheetTitle>
          <div className="flex items-center justify-between rounded-md bg-secondary py-2 pl-2 text-sm font-bold lg:text-lg">
            <p className="font-semibold">Retirada na Loja</p>
            <RadiobuttonIcon className="m-auto mx-5 text-primary" />
          </div>
        </SheetHeader>

        {/* PAGAMENTO */}
        <SheetHeader className="flex flex-col">
          <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
            Forma de Pagamento
          </SheetTitle>
          {isLoading && <p>Carregando cartões...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {cards.length === 0
            ? !isLoading && <p>Você não possui cartões cadastrados.</p>
            : cards.map((card) => (
                <div
                  key={card.cardId}
                  className={`items-left flex cursor-pointer flex-col justify-between gap-4 rounded-md p-2 text-sm lg:text-xl ${
                    selectedCard === card.cardId
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-white"
                  }`}
                  onClick={() => handleCardSelect(card.cardId)}
                >
                  <div className="flex items-center justify-between">
                    <p>{formatCardNumber(card.number)}</p>
                    <div className="flex gap-2">
                      <Link to="/cartoes">
                        <IconEdit className="cursor-pointer" />
                      </Link>
                      <IconTrash onClick={() => handleOpenModal(card.cardId)} />
                    </div>
                  </div>
                  <p className="text-left text-xs lg:text-lg">
                    {card.holderName}
                  </p>
                </div>
              ))}
          <Link
            to="/cartoes"
            className="mt-2 flex items-center justify-start gap-2 rounded-md bg-secondary p-2 text-sm font-semibold lg:text-base"
          >
            <IconPlus />
            <p>Adicionar novo cartão</p>
          </Link>
        </SheetHeader>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
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
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="rounded-full"
              variant="destructive"
              onClick={handleCardDelete}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeliveryAndPayment
