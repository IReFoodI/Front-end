import { useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { useStoreUser } from "../hooks/useStoreUser"
import { checkTokenExpiration } from "../hooks/useTokenValidation"
import { localStorageUtil } from "../utils/localStorageUtil"

export function ProtectedRoute({ children, redirect = "/autenticar/entrar" }) {
  const location = useLocation()
  const pathname = location?.pathname
  const { addUser, user } = useStoreUser()

  useEffect(() => {
    const token = localStorageUtil.getLocalStorageToken()
    const userRefoods = localStorage.getItem("userRefoods")
    if (token && userRefoods) {
      addUser(JSON.parse(userRefoods))
    }
  }, [])

  const token = localStorageUtil.getLocalStorageToken()
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
