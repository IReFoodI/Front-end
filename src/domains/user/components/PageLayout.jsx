import { Outlet } from "react-router-dom"

import Header from "@/ui/components/header/Header"

function PageLayout() {
  return (
    <div>
      <Header />
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  )
}

export default PageLayout
