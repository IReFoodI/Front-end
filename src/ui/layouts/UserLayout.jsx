import { Outlet } from "react-router-dom"

import { Header } from "../components/header/Header"

export function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
