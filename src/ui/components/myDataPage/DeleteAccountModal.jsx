import { Link } from "react-router-dom"

import { ProfileImagePlaceholder } from "@/ui/assets/ProfileImgePlaceholder"

import { Button } from "../ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export function DeleteAccountModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Link className="underline">Excluir Conta</Link>
        </DialogTrigger>
        <DialogContent className="max-w-[90%] rounded-md lg:max-w-[30%]">
          <DialogHeader>
            <DialogTitle className="w-full text-center">
              Tem certeza que deseja excluir?
            </DialogTitle>
            <DialogDescription className="m-auto w-full text-center lg:w-[80%]">
              Após a exclusão desta conta todos os seus dados serão apagados.
              Mesmo que crie uma nova conta não será possível recuperar.
            </DialogDescription>
          </DialogHeader>
          <ProfileImagePlaceholder className="m-auto" />
          <DialogFooter>
            <Button
              variant="outline"
              className="m-auto w-[80%] rounded-full border-2 border-ring text-ring hover:bg-background hover:text-ring hover:drop-shadow-md lg:text-lg"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
