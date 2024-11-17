import { Outlet } from "react-router-dom"

// import { ProtectedRoute } from "@/app/router/ProtectedRoute"

export function ProtectedLayout() {
  return (
    // <ProtectedRoute>
    <div className="px-3">
      <Outlet />
    </div>
    // </ProtectedRoute>
  )
}
