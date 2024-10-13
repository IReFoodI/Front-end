import { Outlet } from "react-router-dom"

import { Header } from "../components/header/Header"

export function UserLayout() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-2xl p-3 md:w-[85%] lg:w-[70%] lg:p-0">
        <Outlet />
      </div>
    </>
  )
}
