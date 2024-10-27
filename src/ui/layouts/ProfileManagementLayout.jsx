import { Outlet } from "react-router-dom"

import ilustra from "@/ui/assets/ilustra.png"

export function ProfileManagementLayout() {
  return (
    <div
      id="profileManagementLayout"
      className="mx-auto grid max-h-full w-full max-w-screen-lg flex-grow text-gray-600 antialiased lg:grid-cols-2 lg:gap-x-8"
    >
      <Outlet />
      <div className="mt-24 hidden lg:flex">
        <img
          className="max-w-[70vh] md:fixed"
          src={ilustra}
          alt="imagem decorativa padrão"
        />
      </div>
    </div>
  )
}
