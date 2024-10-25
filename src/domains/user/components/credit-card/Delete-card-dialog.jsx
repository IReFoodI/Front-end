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
import cardStore from "../../stores/cardStore"

export function DeleteCardDialog({
  cardToDelete,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  closeDeleteCardModal,
}) {
  const { loading, onRequest } = useFetch()
  const { deleteCard } = cardStore()
  function handleSuccess() {
    closeDeleteCardModal()
    deleteCard(cardToDelete.current)
  }
  async function onSubmit() {
    await onRequest({
      request: () => deleteCreditCard(cardToDelete?.current),
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
