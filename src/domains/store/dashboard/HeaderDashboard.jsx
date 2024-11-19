import { Link } from "react-router-dom"

import Logo from "@/ui/assets/Logo-Negocios.png"
export function HeaderDashboard() {
  return (
    <header className="sticky bg-slate-900 shadow-md">
      <div className="mx-auto flex flex-col items-center justify-between gap-3 px-8 py-4 text-white md:flex-row">
        <div className="flex w-full items-center justify-start">
          <Link
            to="/dashboard/inicio"
            className="flex items-center justify-start"
          >
            <img
              src={Logo}
              alt="Logo da Loja"
              className="h-8 md:h-12 lg:flex"
            />
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <h1 className="text-xl font-semibold lg:text-3xl">
            Gestor de Pedidos
          </h1>
        </div>
        <div className="flex w-full items-center justify-end"></div>
      </div>
    </header>
  )
}
