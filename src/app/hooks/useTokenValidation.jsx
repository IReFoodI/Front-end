import { decodeJwt } from "jose"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { localStorageUtil } from "../utils/localStorageUtil"

export function checkTokenExpiration(token) {
  try {
    const decoded = decodeJwt(token)
    if (decoded.exp * 1000 < Date.now()) {
      localStorageUtil.removeLocalStorageToken()
      return false
    }
    return true
  } catch (error) {
    console.error("Erro ao decodificar o JWT:", error)
    localStorageUtil.removeLocalStorageToken()
    return false
  }
}

export function useTokenValidation() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorageUtil.getLocalStorageToken()
    if (!token) {
      return
    }

    const isValidToken = checkTokenExpiration(token)

    if (!isValidToken) {
      toast.error("Sessão expirada. Faça login novamente.")
      return
    }

    navigate("/")
  }, [navigate])
}
