import { Outlet } from "react-router-dom"

// import { ProtectedRoute } from "@/app/router/ProtectedRoute"

export function ProtectedLayout() {
  return (
    //Todo Quando tiver pronta a parte de autenticação descomenta isso
    //  <ProtectedRoute>
    <Outlet />
    // </ProtectedRoute>
  )
}
