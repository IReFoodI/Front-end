import { IconCreditCard } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"

import useFetch from "@/app/hooks/useFetch"
import { Button } from "@/ui/components/ui/button/button"
import { Loading } from "@/ui/components/ui/loading"

import { getAllCreditCard } from "../../services/credit-card-service"
import cardStore from "../../stores/cardStore"
import { DeleteCardDialog } from "./Delete-card-dialog"
import { SmallCard } from "./SmallCard"

export function CardPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { cardData, setCardData, isCardLoading, loadedCards } = cardStore()
  const cardToDelete = useRef(null)

  const { loading, onRequest } = useFetch()

  function handleSuccess(data) {
    setCardData(data)
    loadedCards()
  }
  function handleError() {
    loadedCards()
  }

  useEffect(() => {
    async function request() {
      await onRequest({
        request: getAllCreditCard,
        onSuccess: handleSuccess,
        onError: handleError,
      })
    }
    request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function closeDeleteCardModal() {
    setIsDeleteModalOpen(false)
  }

  function openDeleteCardModal() {
    setIsDeleteModalOpen(true)
  }

  if (loading || isCardLoading) {
    return <Loading />
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
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        openDeleteCardModal={openDeleteCardModal}
        closeDeleteCardModal={closeDeleteCardModal}
      />
    </div>
  )
}
