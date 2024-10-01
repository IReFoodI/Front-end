import { Outlet } from "react-router-dom"

import { Header } from "@/ui/components/header/Header"

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
