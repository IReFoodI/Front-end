import { Outlet } from "react-router-dom"

import { Decorative } from "../../domains/user/components/authentication/Decorative"

export function AuthenticationLayout() {
  return (
    <div className="col-span-2 grid h-screen items-center p-3 sm:grid-cols-2 lg:px-0">
      <Decorative className={"!relative hidden"} />
      <div className="max-h-screen overflow-y-auto bg-background px-1 text-center sm:col-start-2 sm:px-16 sm:py-12">
        <Outlet />
      </div>
    </div>
  )
}
