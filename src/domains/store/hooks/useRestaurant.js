import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { restaurantService } from "@/domains/store/services/restaurantService"

import {
  fetchAllRestaurantHoursToday,
  getRestaurantHoursById,
} from "../services/restaurantHoursService"

export function useRestaurant() {
  const { storeId } = useParams()

  const [restaurantById, setRestaurantById] = useState([])
  const [restaurantHoursById, setRestaurantHoursById] = useState([])
  const [restaurantHoursToday, setRestaurantHoursToday] = useState([])
  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    const fetchRestaurantById = async () => {
      await onRequest({
        request: () => restaurantService.getRestaurantById(storeId),
        onSuccess: async (restaurantByIdRes) => {
          setRestaurantById(restaurantByIdRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchRestaurantHoursById = async () => {
      await onRequest({
        request: () => getRestaurantHoursById(storeId),
        onSuccess: async (restaurantHoursByIdRes) => {
          setRestaurantHoursById(restaurantHoursByIdRes)
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
    fetchRestaurantHoursById()
    fetchRestaurantById()
  }, [onRequest, error])

  return {
    restaurantById,
    restaurantHoursById,
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
