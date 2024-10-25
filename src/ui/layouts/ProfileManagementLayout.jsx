import { Outlet } from "react-router-dom"

import ilustra from "@/ui/assets/ilustra.png"

export function ProfileManagementLayout() {
  return (
    <div
      id="page"
      className="max-h-full items-start text-gray-600 antialiased lg:grid lg:h-auto lg:grid-cols-2 lg:gap-x-8"
    >
      <Outlet />
      <div className="hidden lg:grid">
        <img
          className="max-w-[70vh] md:fixed"
          src={ilustra}
          alt="imagem decorativa padrão"
        />
      </div>
    </div>
  )
}
