import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"

export function ModalSaveChanges({ toggleOpenModal, isModalOpen, onConfirm }) {
  return (
    <Dialog open={isModalOpen} onOpenChange={toggleOpenModal}>
      <DialogContent>
        <DialogTitle>Deseja salvar as alterações?</DialogTitle>
        <DialogDescription>
          Confirme para salvar as alterações realizadas.
        </DialogDescription>
        <DialogFooter className={"flex gap-2 md:gap-0"}>
          <Button
            className="rounded-full"
            variant="secondary"
            onClick={toggleOpenModal}
          >
            Cancelar
          </Button>
          <Button className="rounded-full" onClick={onConfirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
