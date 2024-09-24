import { Outlet } from "react-router-dom"

import { LoginProvider } from "@/app/context/LoginContext"

import { Decorative } from "../../domains/user/components/login/Decorative"

export function Layout() {
  return (
    <div className="grid h-screen content-center items-center p-3 sm:grid-cols-2 lg:px-0">
      <LoginProvider>
        <Decorative className={"hidden"} />
        <div className="grid max-w-lg content-center gap-2 bg-background text-center sm:px-16 sm:py-12">
          <Outlet />
        </div>
      </LoginProvider>
    </div>
  )
}
