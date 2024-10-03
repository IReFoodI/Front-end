import {
  IconCurrencyDollar,
  IconLogout,
  // IconMenu2,
  IconPaperBag,
  IconToolsKitchen2,
} from "@tabler/icons-react"
import { useState } from "react"

import { Button } from "@/ui/components/ui/button/button"
export function SidebarDashboard() {
  const [open, setopen] = useState(false)

  const toggleMenu = () => {
    setopen(!open)
  }
  return (
    <>
      {/* <button
        onClick={toggleMenu}
        className="absolute left-2 top-2 z-30 h-[80px] w-[80px] rounded-lg p-3 text-white transition-all duration-300 ease-in-out hover:bg-orange-500 lg:hidden"
      >
        <IconMenu2 size={40} className="mx-auto" />
      </button> */}

      <div className="z-50 flex flex-grow flex-row items-center justify-between bg-slate-900 py-6 text-sm text-white lg:max-w-24 lg:flex-col lg:gap-3">
        <div className="flex flex-row gap-3 lg:flex-col">
          <Button
            className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500"
            variant="ghost"
          >
            <IconPaperBag size={40} className="mx-auto" />
            <p>Pedidos</p>
          </Button>
          <Button
            className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500"
            variant="ghost"
          >
            <IconToolsKitchen2 size={40} className="mx-auto" />
            <p>Cardápio</p>
          </Button>
          <Button
            className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500"
            variant="ghost"
          >
            <IconCurrencyDollar size={40} className="mx-auto" />
            <p>Finanças</p>
          </Button>
        </div>
        <div className="flex flex-row gap-3 lg:flex-col">
          {/* <Toggle className="flex w-[80px] flex-col items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-orange-500">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="flex w-full flex-col items-center justify-center rounded-lg"
            >
              <IconSettings size={40} />
              <p>Ajustes</p>
            </Button>
          </Toggle> */}
          <Button
            className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500"
            variant="ghost"
          >
            <IconLogout size={40} className="mx-auto" />
            <p>Sair</p>
          </Button>
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
