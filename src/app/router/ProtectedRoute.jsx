import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"
import { checkTokenExpiration } from "../hooks/useTokenValidation"

export function ProtectedRoute({ children, redirect = "/autenticar/entrar" }) {
  const location = useLocation()
  const pathname = location?.pathname
  const { user } = useContext(AuthContext)

  const token = localStorage.getItem("jwtRefoods")
  const isTokenValid = token ? checkTokenExpiration(token) : false

  if (!user || !isTokenValid) {
    return (
      <Navigate
        to={`${redirect}${pathname && `?redirect=${location.pathname}`}`}
      />
    )
  }

  return children
}
