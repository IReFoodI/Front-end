import { Outlet } from "react-router-dom"

import Header from "@/ui/components/header/Header"

function App() {
  return (
    <>
      <Outlet />
      <Header />
    </>
  )
}

export default App
