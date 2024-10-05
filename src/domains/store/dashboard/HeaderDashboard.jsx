import { Link } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"

import Logo from "./Logo-Negocios.png"
export function HeaderDashboard() {
  return (
    <header className="sticky bg-slate-900 shadow-md">
      <div className="mx-auto flex h-24 items-center justify-between px-8 text-white">
        <Link
          to="/dashboard"
          className="flex flex-grow items-center justify-start"
        >
          <img src={Logo} alt="Logo da Loja" className="hidden h-12 lg:flex" />
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
