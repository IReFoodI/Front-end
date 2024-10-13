import { Outlet } from "react-router-dom"

import { Header } from "../components/header/Header"

export function UserLayout() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-2xl p-3 pt-5 md:w-[85%] lg:w-[70%] lg:p-0 lg:py-10 lg:pt-7">
        <Outlet />
      </div>
    </>
  )
}
