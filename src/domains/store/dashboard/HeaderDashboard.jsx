import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"

import Logo from "./Logo-Negocios.png"
export function HeaderDashboard() {
  return (
    <header className="sticky bg-slate-900 shadow-md">
      <div className="mx-auto flex flex-col items-center justify-between gap-3 px-8 py-4 text-white md:flex-row">
        <Link
          to="/dashboard"
          className="flex flex-grow items-center justify-start"
        >
          <img src={Logo} alt="Logo da Loja" className="h-8 md:h-12 lg:flex" />
        </Link>
        <div className="flex flex-grow justify-center">
          <h1 className="text-xl font-semibold lg:text-3xl">
            Gestor de Pedidos
          </h1>
        </div>
        <div className="flex flex-grow items-center justify-end">
          <Button className="hidden bg-green-500 hover:bg-green-600 lg:flex">
            Loja com itens ativos
          </Button>
        </div>
      </div>
    </header>
  )
}
