import axios from "axios"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"

export function useAddressUserStoreProfile() {
  const [address, setAddress] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { onRequest, error } = useFetch()

  useEffect(() => {
    const fetchAddressUserStoreProfileData = async () => {
      await onRequest({
        request: async () => axios.get("http://localhost:8080/api/address/1"),
        onSuccess: async (addressRes) => {
          console.log("Address:", addressRes)
          setAddress(addressRes)
          setIsLoading(false)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchAddressUserStoreProfileData()
  }, [onRequest, error])

  const handleStatusChange = async (addressId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/address/${addressId}`,
        { active: newStatus },
        { headers: { "Content-Type": "application/json" } }
      )

      if (response.status !== 200) {
        throw new Error("Erro ao atualizar o status do endereço.")
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error)
      if (error.response) {
        console.error("Response data:", error.response.data)
        console.error("Response status:", error.response.status)
      }
    }
  }

  return { address, isLoading, handleStatusChange }
}

// Função para decodificar o token JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    console.error("Token inválido", e)
    return null
  }
}
