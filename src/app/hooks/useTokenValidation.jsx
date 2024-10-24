import { decodeJwt } from "jose"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function checkTokenExpiration(token) {
  try {
    const decoded = decodeJwt(token)
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtRefoods")
      return false
    }
    return true
  } catch (error) {
    console.error("Erro ao decodificar o JWT:", error)
    localStorage.removeItem("jwtRefoods")
    return false
  }
}

export function useTokenValidation() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwtRefoods")
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
