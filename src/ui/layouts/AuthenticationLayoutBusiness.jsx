import { Outlet } from "react-router-dom"

import { DecorativeBusiness } from "@/domains/store/components/authentication/DecorativeBusiness"

export function AuthenticationLayoutBusiness() {
  return (
    <div className="min-h-screen content-center items-center bg-dashboard-login bg-cover bg-center p-3 font-inter text-gray-500">
      <div className="m-auto max-w-6xl justify-center gap-8 sm:grid sm:items-center lg:grid-cols-2">
        <DecorativeBusiness />
        <div className="relative z-50 rounded-lg bg-background px-3 py-5 text-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
