import axios from "axios"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"

const BASE_URL_PRODUCT_RESTAURANT = "/api/product/restaurant"
const BASE_URL_PRODUCT = "/api/product"

export function useProducts(id) {
  const [products, setProducts] = useState([])
  const [restaurantId, setRestaurantId] = useState(null)

  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    setRestaurantId(id)

    const fetchProducts = async () => {
      await onRequest({
        request: async () =>
          axios.get(`${BASE_URL_PRODUCT_RESTAURANT}/${restaurantId}`),
        onSuccess: async (productsRes) => {
          console.log("Products:", productsRes)
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
        `${BASE_URL_PRODUCT}/${productId}`,
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

  return { products, loading, restaurantId, handleStatusChange }
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
