import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { restaurantService } from "@/domains/store/services/restaurantService"

import {
  fetchAllRestaurantHours,
  fetchAllRestaurantHoursToday,
} from "../services/restaurantHoursService"

export function useRestaurant() {
  const [restaurants, setRestaurants] = useState([])
  const [restaurantHours, setRestaurantHours] = useState([])
  const [restaurantHoursToday, setRestaurantHoursToday] = useState([])
  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    const fetchRestaurants = async () => {
      await onRequest({
        request: restaurantService.getRestaurants,
        onSuccess: async (restaurantRes) => {
          setRestaurants(restaurantRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchRestaurantHours = async () => {
      await onRequest({
        request: fetchAllRestaurantHours,
        onSuccess: async (restaurantHoursRes) => {
          setRestaurantHours(restaurantHoursRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchRestaurantHoursToday = async () => {
      await onRequest({
        request: fetchAllRestaurantHoursToday,
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

  return {
    restaurants,
    restaurantHours,
    restaurantHoursToday,
    loading,
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
