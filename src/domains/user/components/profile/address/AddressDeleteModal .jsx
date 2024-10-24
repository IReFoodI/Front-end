import useFetch from "@/app/hooks/useFetch"
import { addressService } from "@/domains/user/services/addressService"
import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"

export function AddressDeleteModal({
  toggleOpenModal,
  addressId,
  isModalOpen,
  fetchAddresses,
}) {
  const { loading, onRequest } = useFetch()

  const handleAddressDelete = async (addressId) => {
    toggleOpenModal(false)
    return await onRequest({
      request: () => addressService.deleteAddressById(addressId),
      onSuccess: fetchAddresses,
      successMessage: "Endereço excluído com sucesso!",
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={toggleOpenModal}>
      <DialogContent>
        <DialogTitle>Deseja realmente excluir este endereço?</DialogTitle>
        <DialogDescription>
          Esta ação não poderá ser desfeita. Isso excluirá permanentemente o
          endereço.
        </DialogDescription>
        <DialogFooter>
          <Button
            className="rounded-full"
            variant="ghost"
            onClick={() => toggleOpenModal()}
          >
            Cancelar
          </Button>
          <Button
            className="rounded-full"
            variant="destructive"
            disabled={loading}
            onClick={() => {
              handleAddressDelete(addressId)
            }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
