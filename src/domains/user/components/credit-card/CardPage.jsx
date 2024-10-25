import { IconCreditCard } from "@tabler/icons-react"
import { useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { toast } from "sonner"

import { useFetchOnOpen } from "@/app/hooks/useFetchOnOpen"
import { Button } from "@/ui/components/ui/button/button"
import { Loading } from "@/ui/components/ui/loading"

import { getCreditCard } from "../../services/credit-card-service"
import { DeleteCardDialog } from "./Delete-card-dialog"
import { SmallCard } from "./SmallCard"

const cardDataTeste = [
  {
    cardId: 1,
    holderName: "Dalia Bezerra",
    number: "0000000000001234",
    validity: "06/25",
  },
  {
    cardId: 2,
    holderName: "Hortência Flores",
    number: "1233 1233 1212 0000",
    validity: "11/35",
  },
  {
    cardId: 3,
    holderName: "Isaac Flores",
    number: "1111 2222 3333 1554",
    validity: "09/38",
  },
]
export function CardPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [cardData, setCardData] = useState(cardDataTeste)
  const cardToDelete = useRef(null)

  const { isLoading, isError } = useFetchOnOpen(getCreditCard)

  console.log(cardData)

  // const toggleOpenModal = () => {
  //   setIsDeleteModalOpen(!isModalOpen)
  // }

  function closeDeleteCardModal() {
    setIsDeleteModalOpen(false)
  }

  function openDeleteCardModal() {
    setIsDeleteModalOpen(true)
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    toast.error("Ocorreu um erro ao tentar buscar os cartões.")
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[1216px] flex-col items-center gap-6 text-gray-600 antialiased lg:h-auto">
      <h1 className="w-full pb-6 text-center text-2xl font-semibold">
        Cartões
      </h1>

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col">
          {cardData?.length > 0 ? (
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-4">
              <div className="mx-auto mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {cardData.map((data, index) => (
                  <SmallCard
                    key={index}
                    data={data}
                    openDeleteCardModal={openDeleteCardModal}
                    cardToDelete={cardToDelete}
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
                  <Button className="w-full max-w-[19rem] rounded-full px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out">
                    Adicionar novo cartão
                  </Button>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteCardDialog
        cardToDelete={cardToDelete}
        setCardData={setCardData}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        openDeleteCardModal={openDeleteCardModal}
        closeDeleteCardModal={closeDeleteCardModal}
      />
    </div>
  )
}
