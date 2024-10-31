import { IconLogout } from "@tabler/icons-react"

import userStore from "@/domains/user/stores/userStore"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/components/ui/alert-dialog"
import { Button } from "@/ui/components/ui/button/button"

export function DashboardLogout() {
  const { logout } = userStore()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`flex h-fit w-16 select-none flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white md:w-20`}
          variant="ghost"
        >
          <IconLogout className="size-6 md:size-10" />
          <p className="text-xs md:text-sm">Sair</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja sair?</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Sair</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
