import { IconCreditCard } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
  function handleAddCard() {
    //Navegar para rota de adicionar cartão
    navigate("/")
  }
  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="mx-auto flex h-screen w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
      <h1 className="my-5 w-full pb-6 pt-7 text-center text-2xl font-semibold lg:py-10">
        Cartões
      </h1>

      <div className="flex w-full flex-col items-start md:px-8">
        <div className="flex w-full flex-col">
          {cardData.length > 0 ? (
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-4">
              <div className="mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cardData.map((data, index) => (
                  <SmallCard
                    key={index}
                    data={data}
                    toggleOpenModal={toggleOpenModal}
                  />
                ))}
              </div>
              <Button
                className="w-full max-w-[19rem] rounded-full px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out"
                onClick={handleAddCard}
              >
                Adicionar novo cartão
              </Button>
            </div>
          ) : (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <div className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center">
                <IconCreditCard size={45} />
                <h2 className="text-xl font-semibold">
                  Poxa, você ainda não possui cartões cadastrados
                </h2>
                <p className="w-[250px]">
                  Vamos adicionar seu primeiro cartão para fazer um novo pedido!
                </p>
                <Button
                  className="w-full rounded-full px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out"
                  onClick={handleAddCard}
                >
                  Adicionar novo cartão
                </Button>
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
              onClick={() => {
                // ação de excluir aqui
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
