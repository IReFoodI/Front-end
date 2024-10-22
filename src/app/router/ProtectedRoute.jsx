import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

export function ProtectedRoute({ children, redirect = "/autenticar/entrar" }) {
  const location = useLocation()
  const pathname = location?.pathname
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <Navigate
        to={`${redirect}${pathname && `?redirect=${location.pathname}`}`}
      />
    )
  }

  return children
}
