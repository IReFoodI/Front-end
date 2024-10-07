import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

export function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to={"/entrar"} />
  }
  return children
}
