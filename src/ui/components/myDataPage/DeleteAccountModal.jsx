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
          <Button className="my-12 w-[50%] bg-white text-center text-xl font-semibold text-slate-700 hover:bg-white hover:drop-shadow-md lg:my-5 lg:rounded-full lg:border lg:border-primary lg:p-5 lg:text-primary">
            Excluir Conta
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%] rounded-md lg:max-w-[30%]">
          <DialogHeader>
            <DialogTitle className="w-full text-center lg:text-2xl">
              Tem certeza que deseja excluir?
            </DialogTitle>
            <DialogDescription className="m-auto w-full text-center lg:w-[90%] lg:text-xl">
              Após a exclusão desta conta todos os seus dados serão apagados.
              Mesmo que crie uma nova conta não será possível recuperar.
            </DialogDescription>
          </DialogHeader>
          <ProfileImagePlaceholder className="m-auto" />
          <DialogFooter>
            <Button
              variant="outline"
              className="m-auto w-[80%] rounded-full border-2 border-ring text-ring hover:bg-background hover:text-ring hover:drop-shadow-md lg:p-5 lg:text-xl"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
