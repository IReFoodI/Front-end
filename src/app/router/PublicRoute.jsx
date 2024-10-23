import { Navigate } from "react-router-dom"

import { useStoreUser } from "../hooks/useStoreUser"
import { checkTokenExpiration } from "../hooks/useTokenValidation"

export function PublicRoute({ children, redirect = "/" }) {
  const { user } = useStoreUser()

  const token = localStorage.getItem("jwtRefoods")
  const isTokenValid = token ? checkTokenExpiration(token) : false

  if (user && isTokenValid) {
    return <Navigate to={redirect} />
  }

  return children
}
