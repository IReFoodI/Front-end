import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"
import { checkTokenExpiration } from "../hooks/useTokenValidation"

export function PublicRoute({ children, redirect = "/" }) {
  const { user } = useContext(AuthContext)

  const token = localStorage.getItem("jwtRefoods")
  const isTokenValid = token ? checkTokenExpiration(token) : false

  if (user && isTokenValid) {
    return <Navigate to={redirect} />
  }

  return children
}
