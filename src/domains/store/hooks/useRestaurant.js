import axios from "axios"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState([])
  const [restaurantHours, setRestaurantHours] = useState([])
  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    const fetchRestaurant = async () => {
      await onRequest({
        request: async () =>
          axios.get("http://localhost:8080/api/restaurants/1"),
        onSuccess: async (restaurantRes) => {
          console.log("Restaurant:", restaurantRes)
          setRestaurant(...restaurantRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchRestaurant()
  }, [onRequest, error])

  useEffect(() => {
    const fetchRestaurantHours = async () => {
      await onRequest({
        request: async () =>
          axios.get("http://localhost:8080/api/restaurant-hours/restaurant/1"),
        onSuccess: async (restaurantHoursRes) => {
          console.log("Restaurant Hours:", restaurantHoursRes)
          setRestaurantHours(restaurantHoursRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchRestaurantHours()
  }, [onRequest, error])

  const handleStatusChange = async (restaurantId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/restaurant/${restaurantId}`,
        { active: newStatus },
        { headers: { "Content-Type": "application/json" } }
      )

      if (response.status !== 200) {
        throw new Error("Erro ao atualizar o status do restaurante.")
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error)
      if (error.response) {
        console.error("Response data:", error.response.data)
        console.error("Response status:", error.response.status)
      }
    }
  }

  return { restaurant, restaurantHours, loading, handleStatusChange }
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
