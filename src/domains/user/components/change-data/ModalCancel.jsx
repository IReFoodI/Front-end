import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/components/ui/dialog"

export function ModalCancel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja cancelar as alterações?
          </DialogTitle>
          <DialogDescription>
            As alterações feitas até o momento serão perdidas
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <Button type="button" variant="outline">
            <Link to={"/meus-dados"}>Cancelar</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
