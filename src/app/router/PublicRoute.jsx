import { Navigate } from "react-router-dom"

import userStore from "@/domains/user/stores/userStore"

import { checkTokenExpiration } from "../hooks/useTokenValidation"

export function PublicRoute({ children, redirect = "/" }) {
  const { user } = userStore()

  const token = localStorage.getItem("jwtRefoods")
  const isTokenValid = token ? checkTokenExpiration(token) : false

  if (user && isTokenValid) {
    return <Navigate to={redirect} />
  }

  return children
}
