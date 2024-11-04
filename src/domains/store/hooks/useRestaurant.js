import axios from "axios"
import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"

const BASE_URL_RESTAURANT = "/api/restaurant"
const BASE_URL_RESTAURANTS = "/api/restaurants"
const BASE_URL_RESTAURANT_HOURS = "/api/restaurant-hours"

export function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState([])
  const [restaurantId, setRestaurantId] = useState(null)
  const [restaurantHours, setRestaurantHours] = useState([])
  const [restaurantHoursToday, setRestaurantHoursToday] = useState([])
  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    setRestaurantId(id)

    const fetchRestaurant = async () => {
      await onRequest({
        request: async () =>
          axios.get(`${BASE_URL_RESTAURANTS}/${restaurantId}`),
        onSuccess: async (restaurantRes) => {
          console.log("Restaurant:", restaurantRes)
          setRestaurant(restaurantRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchRestaurantHours = async () => {
      await onRequest({
        request: async () =>
          axios.get(`${BASE_URL_RESTAURANT_HOURS}/restaurant/${restaurantId}`),
        onSuccess: async (restaurantHoursRes) => {
          console.log("Restaurant Hours:", restaurantHoursRes)
          setRestaurantHours(restaurantHoursRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchRestaurantHoursToday = async () => {
      await onRequest({
        request: async () => axios.get(`${BASE_URL_RESTAURANT_HOURS}/today`),
        onSuccess: async (restaurantHoursTodayRes) => {
          console.log("Restaurant Hours:", restaurantHoursTodayRes)
          setRestaurantHoursToday(restaurantHoursTodayRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchRestaurantHoursToday()
    fetchRestaurantHours()
    fetchRestaurant()
  }, [onRequest, error])

  const handleStatusChange = async (restaurantId, newStatus) => {
    try {
      const response = await axios.patch(
        `${BASE_URL_RESTAURANT}/${restaurantId}`,
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
