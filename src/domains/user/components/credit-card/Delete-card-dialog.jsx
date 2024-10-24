import useFetch from "@/app/hooks/useFetch"
import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"
import { Loading } from "@/ui/components/ui/loading"

import { deleteCreditCard } from "../../services/credit-card-service"

export function DeleteCardDialog({
  cardToDelete,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  closeDeleteCardModal,
  setCardData,
}) {
  const { loading, onRequest } = useFetch()

  function handleSuccess() {
    closeDeleteCardModal()
    setCardData((cardData) => {
      return cardData.filter((card) => card?.cardId !== cardToDelete.current)
    })
  }
  async function onSubmit() {
    console.log("first")
    await onRequest({
      //todo tem que passar o id do cartao a ser deletado, pegar o id de alguma forma
      request: () => deleteCreditCard(),
      onSuccess: handleSuccess,
      successMessage: "Cartão excluído com sucesso!",
      errorMessage: "Ocorreu um erro ao tentar excluir o cartão.",
    })
  }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogContent>
        <DialogTitle>Deseja realmente excluir este cartão?</DialogTitle>
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <DialogDescription />
            <Loading />
          </div>
        ) : (
          <>
            <DialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente os
              dados do cartão.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="rounded-full"
                  variant="ghost"
                  onClick={closeDeleteCardModal}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="rounded-full"
                variant="destructive"
                onClick={() => {
                  onSubmit()
                  console.log("first")
                }}
              >
                Confirmar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
