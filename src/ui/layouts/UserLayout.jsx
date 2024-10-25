import { Outlet } from "react-router-dom"

import { Header } from "../components/header/Header"

export function UserLayout() {
  return (
    <div className="h-screen font-inter">
      <Header />
      <div
        id="userLayout"
        className="mx-auto flex min-h-[calc(100%-176px)] w-full max-w-screen-xl flex-col p-3 pt-5 text-gray-500 md:w-[85%] lg:min-h-[calc(100%-104px)] lg:w-[70%] lg:p-0 lg:py-10 lg:pt-7 xl:min-h-[calc(100%-84px)]"
      >
        <Outlet />
      </div>
    </div>
  )
}
