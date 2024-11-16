import { useNavigate } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { localStorageUtil } from "@/app/utils/localStorageUtil"
import { userService } from "@/domains/user/services/userService"
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

export function DeleteAccountModal({ toggleOpenModal, isModalOpen }) {
  const navigate = useNavigate()
  const { loading, onRequest } = useFetch()
  const handleDeleteAccount = async () => {
    toggleOpenModal(false)
    return await onRequest({
      request: () => userService.deleteAccount(),
      onSuccess: () => {
        localStorageUtil.removeLocalStorageToken()
        navigate("/autenticar/entrar")
      },
    })
  }
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={toggleOpenModal}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Tem certeza que deseja excluir?
            </DialogTitle>
            <DialogDescription className="m-auto w-full text-center">
              Após a exclusão desta conta todos os seus dados serão apagados.
              Mesmo que crie uma nova conta não será possível recuperar.
            </DialogDescription>
          </DialogHeader>
          <ProfileImagePlaceholder className="m-auto" />
          <DialogFooter className={"flex gap-2 md:gap-0"}>
            <Button
              variant="outline"
              className="rounded-full"
              disabled={loading}
              onClick={handleDeleteAccount}
            >
              Excluir
            </Button>
            <Button className="rounded-full" onClick={toggleOpenModal}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
