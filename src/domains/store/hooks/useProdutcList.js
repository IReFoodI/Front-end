import axios from "axios"
import { useEffect, useState } from "react"

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [restaurantId, setRestaurantId] = useState(null)

  const token = btoa(
    JSON.stringify({
      userId: 123,
      restaurantId: 1,
      exp: 1711731200,
    })
  )
  localStorage.setItem("authToken", `header.${token}.signature`)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("authToken")
        const decodedToken = parseJwt(token)
        if (!decodedToken || !decodedToken.restaurantId) {
          throw new Error("Restaurante não encontrado no token.")
        }

        const id = decodedToken.restaurantId
        setRestaurantId(id)

        const response = await axios.get(
          `http://localhost:8080/api/product/restaurant/${id}`
        )

        const productsData = response.data
        setProducts(productsData)
        localStorage.setItem("productsData", JSON.stringify(productsData))
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
