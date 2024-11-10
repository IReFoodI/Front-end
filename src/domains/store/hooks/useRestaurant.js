import { useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

import { useFetch } from "@/app/hooks/useFetch"
import restaurantService from "@/app/service/restaurantService"
import { restaurantService as restaurantServiceStore } from "@/domains/store/services/restaurantService"

import { fetchRestaurantHourTodayById } from "../services/restaurantHoursService"

export function useRestaurant() {
  const { storeId } = useParams()

  const {
    loading: loadingRestaurant,
    data: restaurantData,
    onRequest: onRequestRestaurant,
  } = useFetch()

  const {
    loading: loadingHoursToday,
    data: restaurantHoursTodayData,
    onRequest: onRequestRestaurantHoursToday,
  } = useFetch()

  const {
    loading: loadingAllHours,
    data: restaurantAllHoursData,
    onRequest: onRequestRestaurantAllHours,
  } = useFetch()

  const {
    loading: loadingRestaurantAddress,
    data: restaurantAddressesData,
    onRequest: onRequestRestaurantAddress,
  } = useFetch()

  const fetchData = useCallback(async (fetchFunc, onError) => {
    try {
      await fetchFunc()
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }, [])

  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchData(
        () =>
          onRequestRestaurant({
            request: () => restaurantServiceStore.getRestaurantById(storeId),
          }),
        (error) => {
          navigator.navigate(-1)
          toast.error("Restaurante não encontrado")
        }
      ),
      fetchData(
        () =>
          onRequestRestaurantAllHours({
            request: () => restaurantService.fetchRestaurantHoursById(storeId),
          }),
        () =>
          toast.error(
            "Erro ao buscar endereço do restaurante, entre em contato com o suporte"
          )
      ),
      fetchData(
        () =>
          onRequestRestaurantHoursToday({
            request: () => fetchRestaurantHourTodayById(storeId),
          }),
        () => console.error("Erro ao buscar horário de hoje do restaurante")
      ),
      fetchData(
        () =>
          onRequestRestaurantAddress({
            request: () =>
              restaurantService.fetchAddressByRestaurantId(storeId),
          }),
        () => console.error("Erro ao buscar endereço do restaurante")
      ),
    ])
  }, [
    fetchData,
    onRequestRestaurant,
    onRequestRestaurantAllHours,
    onRequestRestaurantHoursToday,
    onRequestRestaurantAddress,
    storeId,
  ])

  useEffect(() => {
    if (storeId) {
      fetchAllData()
    }
  }, [fetchAllData, storeId])

  return useMemo(
    () => ({
      loadingRestaurant,
      restaurantData,
      loadingRestaurantAddress,
      restaurantAddressesData,
      loadingHoursToday,
      restaurantHoursTodayData,
      loadingAllHours,
      restaurantAllHoursData,
    }),
    [
      loadingRestaurant,
      restaurantData,
      loadingRestaurantAddress,
      restaurantAddressesData,
      loadingHoursToday,
      restaurantHoursTodayData,
      loadingAllHours,
      restaurantAllHoursData,
    ]
  )
}
