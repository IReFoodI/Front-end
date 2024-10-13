import { Outlet } from "react-router-dom"

// import { ProtectedRoute } from "@/app/router/ProtectedRoute"
import { HeaderDashboard } from "@/domains/store/dashboard/HeaderDashboard"
import { SidebarDashboard } from "@/domains/store/dashboard/SidebarDashboard"

export function DashBoardLayout() {
  return (
    //Todo Quando tiver pronta a parte de autenticação descomenta isso
    // <ProtectedRoute redirect="/dashboard/autenticar/entrar">
    <div className="flex min-h-screen w-full flex-col">
      <HeaderDashboard />
      <div className="flex flex-1 flex-col gap-3 lg:flex-row">
        <SidebarDashboard />
        <main className="mx-auto flex max-w-screen-2xl flex-1">
          <Outlet />
        </main>
      </div>
    </div>
    // </ProtectedRoute>
  )
}
