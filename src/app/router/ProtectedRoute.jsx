import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import userStore from "@/domains/user/stores/userStore"
import { Loading } from "@/ui/components/ui/loading"

import { checkTokenExpiration } from "../hooks/useTokenValidation"
import { localStorageUtil } from "../utils/localStorageUtil"

export function ProtectedRoute({ children, redirect = "/autenticar/entrar" }) {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorageUtil.getLocalStorageToken()
  const isTokenValid = token ? checkTokenExpiration(token) : false
  const pathname = location?.pathname
  const { user, logout, isUserLoading } = userStore()

  useEffect(() => {
    if (!isUserLoading && (!user || !isTokenValid || !token)) {
      logout()
      navigate(`${redirect}${pathname && `?redirect=${location.pathname}`}`)
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
