import { IconSettings } from "@tabler/icons-react"

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
          <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
            Alertas sonoros
          </DropdownMenuItem>
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
          <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
            Gestão de acesso
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-1 hover:bg-slate-100">
            Alterar senha
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <div
        className={`fixed top-56 z-10 flex flex-col bg-white py-8 text-center font-semibold shadow-right transition-all duration-300 ease-in-out lg:top-auto lg:ms-24`}
      >
        <h3 className="pb-8 text-xl font-bold">Ajustes</h3>
        <h4 className="bg-slate-900 py-2 text-sm text-white">
          GESTOR DE PEDIDOS
        </h4>
        <button className="border-b py-3 hover:text-primary">
          Alertas sonoros
        </button>
        <button className="border-b py-3 hover:text-primary">
          Horário da loja
        </button>
        <h4 className="bg-slate-900 py-2 text-sm text-white">LOJA</h4>
        <button className="border-b py-3 hover:text-primary">Perfil</button>
        <button className="border-b py-3 hover:text-primary">Endereço</button>
        <h4 className="bg-slate-900 py-2 text-sm text-white">CONTA</h4>
        <button className="border-b py-3 hover:text-primary">
          Gestão de acesso
        </button>
        <button className="border-b py-3 hover:text-primary">
          Alterar senha
        </button>
      </div> */}
    </>
  )
}
