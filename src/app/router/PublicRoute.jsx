import { Navigate } from "react-router-dom"

import useUserStore from "@/domains/user/stores/useUserStore"

import { checkTokenExpiration } from "../hooks/useTokenValidation"

export function PublicRoute({ children, redirect = "/" }) {
  const { user } = useUserStore()

  const token = localStorage.getItem("jwtRefoods")
  const isTokenValid = token ? checkTokenExpiration(token) : false

  if (user && isTokenValid) {
    return <Navigate to={redirect} />
  }

  return children
}
