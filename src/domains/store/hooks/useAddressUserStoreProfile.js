import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"

import { fetchAllAddress } from "../services/addressService"

export function useAddressUserStoreProfile() {
  const [address, setAddress] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { onRequest, error } = useFetch()

  useEffect(() => {
    const fetchAddressUserStoreProfileData = async () => {
      await onRequest({
        request: fetchAllAddress,
        onSuccess: async (addressRes) => {
          setAddress(addressRes)
          setIsLoading(false)
          console.log(
            `Todos os endereços de Usuários e Restaurantes: ${address}`
          )
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchAddressUserStoreProfileData()
  }, [onRequest, error])

  return { address, isLoading }
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
