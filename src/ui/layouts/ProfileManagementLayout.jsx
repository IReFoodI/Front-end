import { Outlet } from "react-router-dom"

import ilustra from "@/ui/assets/ilustra.png"

export function ProfileManagementLayout() {
  return (
    <div
      id="page"
      className="mx-auto h-screen max-h-full max-w-screen-2xl items-start text-gray-600 antialiased md:w-[85%] lg:grid lg:h-auto lg:w-[70%] lg:grid-cols-2 lg:gap-x-8"
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
