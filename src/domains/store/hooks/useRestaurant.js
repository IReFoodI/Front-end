import axios from "axios"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState([])
  const [restaurantHours, setRestaurantHours] = useState([])
  const [restaurantHoursToday, setRestaurantHoursToday] = useState([])
  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    const fetchRestaurants = async () => {
      await onRequest({
        request: async () =>
          axios.get(`http://localhost:8080/api/restaurant/restaurants`),
        onSuccess: async (restaurantRes) => {
          setRestaurant(restaurantRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchRestaurantHours = async () => {
      await onRequest({
        request: async () =>
          axios.get(`http://localhost:8080/api/restaurant-hours`),
        onSuccess: async (restaurantHoursRes) => {
          setRestaurantHours(restaurantHoursRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchRestaurantHoursToday = async () => {
      await onRequest({
        request: async () =>
          axios.get("http://localhost:8080/api/restaurant-hours/today"),
        onSuccess: async (restaurantHoursTodayRes) => {
          setRestaurantHoursToday(restaurantHoursTodayRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchRestaurantHoursToday()
    fetchRestaurantHours()
    fetchRestaurants()
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

  return {
    restaurant,
    restaurantHours,
    restaurantHoursToday,
    loading,
    handleStatusChange,
  }
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
