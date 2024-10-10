import { IconSettings } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu"

export function DashboardConfigMenu() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="select-none !bg-transparent ring-0 hover:!bg-primary focus:bg-none focus-visible:ring-0 data-[state=open]:bg-none"
        >
          <Button
            variant="ghost"
            className="flex h-fit w-16 flex-col items-center justify-center rounded-lg !bg-transparent p-3 transition-all duration-300 ease-in-out hover:!bg-primary hover:text-white md:w-20"
          >
            <IconSettings className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Ajustes</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 border-none p-0 lg:ml-[6.25rem] lg:mt-0 lg:translate-y-[84px]">
          <DropdownMenuLabel className="bg-slate-900 text-white">
            GESTOR DE PEDIDOS
          </DropdownMenuLabel>
          <Link to="/dashboard/ajustes/alertas-sonoros">
            <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
              Alertas sonoros
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
            Horário da loja
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="bg-slate-900 text-white">
            LOJA
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
            Endereço
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="bg-slate-900 text-white">
            CONTA
          </DropdownMenuLabel>
          <Link to="/dashboard/ajustes/configuracoes">
            <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
              Configurações
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
