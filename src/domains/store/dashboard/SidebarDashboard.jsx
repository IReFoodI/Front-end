import {
  IconCurrencyDollar,
  // IconMenu2,
  IconPaperBag,
  IconSettings,
  IconToolsKitchen2,
} from "@tabler/icons-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

import { cn } from "@/app/utils/cn"
import { Button } from "@/ui/components/ui/button/button"
import { Toggle } from "@/ui/components/ui/toggle/toggle"

import { DashboardLogout } from "./DashboardLogout"

export function SidebarDashboard() {
  const [open, setopen] = useState(false)

  const toggleMenu = () => {
    setopen(!open)
  }
  return (
    <>
      {/* <button
        onClick={toggleMenu}
        className="absolute left-2 top-2 z-30 h-[80px] md:w-20 w-16 rounded-lg p-3 text-white transition-all duration-300 ease-in-out hover:bg-orange-500 lg:hidden"
      >
        <IconMenu2 size={40} className="mx-auto" />
      </button> */}

      <div className="z-50 flex flex-grow flex-row items-center justify-center gap-1.5 bg-slate-900 py-2 pt-0 text-sm text-white md:justify-between md:py-6 lg:max-w-24 lg:flex-col lg:gap-3">
        <div className="flex flex-row gap-1.5 md:gap-3 lg:flex-col">
          <NavLink
            to={"/dashboard/pedidos"}
            className={`flex w-16 flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
            variant="ghost"
          >
            <IconPaperBag className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Pedidos</p>
          </NavLink>
          <NavLink
            to={"/dashboard/cardapio"}
            className={`flex w-16 flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
            variant="ghost"
          >
            <IconToolsKitchen2 className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Cardápio</p>
          </NavLink>
          <NavLink
            to={"/dashboard/financas"}
            className={`flex w-16 flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-primary md:w-20 [&.active]:bg-primary`}
            variant="ghost"
          >
            <IconCurrencyDollar className="size-6 md:size-10" />
            <p className="text-xs md:text-sm">Finanças</p>
          </NavLink>
        </div>
        <div className="flex flex-row gap-1.5 md:gap-3 lg:flex-col">
          <Toggle
            className={cn(
              "data-[state=on]:bg-primary data-[state=on]:text-white",
              "flex h-fit w-16 flex-col items-center justify-center rounded-lg px-0 py-0 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white md:w-20"
            )}
            asChild
          >
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="flex h-full w-full flex-col items-center justify-center rounded-lg p-3 hover:bg-transparent hover:text-white"
            >
              <IconSettings className="size-6 md:size-10" />
              <p className="text-xs md:text-sm">Ajustes</p>
            </Button>
          </Toggle>
          <DashboardLogout />
        </div>
      </div>

      <div
        className={`fixed top-56 z-10 flex flex-col bg-white py-8 text-center font-semibold shadow-right transition-all duration-300 ease-in-out lg:top-auto lg:ms-24 ${open ? "w-[220px] overflow-hidden" : "w-0 -translate-x-80"}`}
      >
        <h3 className="pb-8 text-xl font-bold">Ajustes</h3>
        <h4 className="bg-slate-900 py-2 text-sm text-white">
          GESTOR DE PEDIDOS
        </h4>
        <button
          onClick={toggleMenu}
          className="border-b py-3 hover:text-primary"
        >
          Alertas sonoros
        </button>
        <button
          onClick={toggleMenu}
          className="border-b py-3 hover:text-primary"
        >
          Horário da loja
        </button>
        <h4 className="bg-slate-900 py-2 text-sm text-white">LOJA</h4>
        <button
          onClick={toggleMenu}
          className="border-b py-3 hover:text-primary"
        >
          Perfil
        </button>
        <button
          onClick={toggleMenu}
          className="border-b py-3 hover:text-primary"
        >
          Endereço
        </button>
        <h4 className="bg-slate-900 py-2 text-sm text-white">CONTA</h4>
        <button
          onClick={toggleMenu}
          className="border-b py-3 hover:text-primary"
        >
          Gestão de acesso
        </button>
        <button
          onClick={toggleMenu}
          className="border-b py-3 hover:text-primary"
        >
          Alterar senha
        </button>
      </div>
    </>
  )
}
