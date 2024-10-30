import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"

export function ModalConfirmDefaultAddress({
  toggleOpenModal,
  addressId,
  isModalOpen,
  onAddressSelect,
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={toggleOpenModal}>
      <DialogContent>
        <DialogTitle>Deseja tornar esse endereço padrão?</DialogTitle>
        <DialogDescription>
          Esta ação tonará o endereço selecionado padrão.
        </DialogDescription>
        <DialogFooter>
          <Button
            className="rounded-full"
            variant="secondary"
            onClick={() => toggleOpenModal()}
          >
            Cancelar
          </Button>
          <Button
            className="rounded-full"
            onClick={() => {
              console.log("id modal", addressId)
              onAddressSelect(addressId)
            }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
