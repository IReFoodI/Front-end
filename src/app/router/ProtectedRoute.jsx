import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import useUserStore from "@/domains/user/stores/useUserStore"
import { Loading } from "@/ui/components/ui/loading"

import { checkTokenExpiration } from "../hooks/useTokenValidation"
import { localStorageUtil } from "../utils/localStorageUtil"

export function ProtectedRoute({
  children,
  redirect = "/autenticar/entrar",
  type = "user",
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorageUtil.getLocalStorageToken()
  const isTokenValid = token ? checkTokenExpiration(token) : false
  const pathname = location?.pathname
  const { user, logout, isUserLoading } = useUserStore()

  useEffect(() => {
    if (!isUserLoading) {
      if (!user || !isTokenValid || !token) {
        logout()
        navigate(`${redirect}${pathname && `?redirect=${location.pathname}`}`)
        return
      }
      if (type === "user" && !user?.userId) {
        navigate("/autenticar/entrar")
      } else if (type === "restaurant" && !user?.restaurantId) {
        navigate("/autenticar/negocios")
      }
    }
  }, [
    isUserLoading,
    user,
    isTokenValid,
    pathname,
    logout,
    navigate,
    redirect,
    location.pathname,
    token,
    type,
  ])

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!isUserLoading && (!user || !isTokenValid || !token)) {
    return <></>
  }

  return children
}
