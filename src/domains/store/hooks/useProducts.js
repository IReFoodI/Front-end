import axios from "axios"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"

export function useProducts() {
  const [products, setProducts] = useState([])

  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    const fetchProducts = async () => {
      await onRequest({
        request: async () => axios.get(`http://localhost:8080/api/product`),
        onSuccess: async (productsRes) => {
          setProducts(productsRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchProducts()
  }, [onRequest, error])

  const handleStatusChange = async (productId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/product/${productId}`,
        { active: newStatus },
        { headers: { "Content-Type": "application/json" } }
      )

      if (response.status !== 200) {
        throw new Error("Erro ao atualizar o status do produto.")
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error)
      if (error.response) {
        console.error("Response data:", error.response.data)
        console.error("Response status:", error.response.status)
      }
    }
  }

  return { products, loading, handleStatusChange }
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
