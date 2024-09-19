import {
  IconCurrencyDollar,
  IconLogout,
  IconMenu2,
  IconPaperBag,
  IconSettings,
  IconToolsKitchen2,
} from "@tabler/icons-react"
import { useState } from "react"
export function SidebarDashboard() {
  const [open, setopen] = useState(false)

  const toggleMenu = () => {
    setopen(!open)
  }
  return (
    <>
      <button
        onClick={toggleMenu}
        className="absolute left-2 top-2 z-30 h-[80px] w-[80px] rounded-lg p-3 text-white transition-all duration-300 ease-in-out hover:bg-orange-500 lg:hidden"
      >
        <IconMenu2 size={40} className="mx-auto" />
      </button>

      <div className="z-50 flex w-24 flex-col items-center justify-between bg-slate-900 py-6 text-sm text-white">
        <div className="flex flex-col gap-3">
          <button className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500">
            <IconPaperBag size={40} className="mx-auto" />
            <p>Pedidos</p>
          </button>
          <button className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500">
            <IconToolsKitchen2 size={40} className="mx-auto" />
            <p>Cardápio</p>
          </button>
          <button className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500">
            <IconCurrencyDollar size={40} className="mx-auto" />
            <p>Finanças</p>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500">
            <IconSettings size={40} className="mx-auto" />
            <p>Ajustes</p>
          </button>
          <button className="w-[80px] rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-orange-500">
            <IconLogout size={40} className="mx-auto" />
            <p>Sair</p>
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col py-8 text-center font-semibold shadow-right transition-all duration-300 ease-in-out ${open ? "w-[220px] overflow-hidden" : "w-0 -translate-x-80"}`}
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
