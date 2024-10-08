import { Outlet } from "react-router-dom"

import { Decorative } from "../../domains/user/components/login/Decorative"

export function Layout() {
  return (
    <div className="grid h-screen items-center p-3 sm:grid-cols-2 lg:px-0">
      <Decorative className={"hidden"} />
      <div className="grid max-h-dvh gap-2 overflow-y-auto overflow-x-hidden bg-background text-center sm:px-16 sm:py-12">
        <Outlet />
      </div>
    </div>
  )
}
