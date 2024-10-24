import { Outlet } from "react-router-dom"

import { ProtectedRoute } from "@/app/router/ProtectedRoute"

export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}
