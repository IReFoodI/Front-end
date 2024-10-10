import { Outlet } from "react-router-dom"

import { StoreProfileSettings } from "@/domains/food/components/StoreSettings/StoreProfileSettings"

function App() {
  return (
    <>
      <Outlet />
      <StoreProfileSettings />
    </>
  )
}

export default App
