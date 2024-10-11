import { Outlet } from "react-router-dom"

import { DecorativeBusiness } from "@/domains/store/components/authentication/DecorativeBusiness"

export function AuthenticationLayoutBusinessLayout() {
  return (
    <div className="bg-dashboard-login grid min-h-screen content-center items-center gap-8 bg-auto bg-center p-3 sm:justify-center md:flex">
      <DecorativeBusiness />
      <div className="relative z-50 rounded-lg bg-background px-10 py-12 text-center">
        <Outlet />
      </div>
    </div>
  )
}
