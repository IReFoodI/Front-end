import { Outlet } from "react-router-dom"

// import { ProtectedRoute } from "@/app/router/ProtectedRoute"
import { HeaderDashboard } from "@/domains/store/dashboard/HeaderDashboard"
import { SidebarDashboard } from "@/domains/store/dashboard/SidebarDashboard"

export function DashBoardLayout() {
  return (
    //Todo Quando tiver pronta a parte de autenticação descomenta isso
    // <ProtectedRoute redirect="/dashboard/autenticar/negocios">
    <div className="flex min-h-screen w-full flex-col">
      <HeaderDashboard />
      <div className="flex flex-1 flex-col lg:max-h-[calc(100vh-80px)] lg:flex-row">
        <div className="lg:sticky lg:flex">
          <SidebarDashboard />
        </div>
        <main className="flex flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-screen-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    // </ProtectedRoute>
  )
}
