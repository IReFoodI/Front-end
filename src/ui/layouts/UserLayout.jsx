import { Outlet } from "react-router-dom"

import { ProtectedRoute } from "@/app/router/ProtectedRoute"

import { Header } from "../components/header/Header"

export function UserLayout() {
  return (
    <>
      <ProtectedRoute redirect="/autenticar/entrar">
        <Header />
        <div className="mx-auto max-w-screen-2xl pt-5 sm:p-3 md:w-[85%] lg:w-[70%] lg:p-0 lg:py-10 lg:pt-7">
          <Outlet />
        </div>
      </ProtectedRoute>
    </>
  )
}
