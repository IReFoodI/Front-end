import { create } from "zustand"

import restaurantService from "@/app/service/restaurantService"

const restaurantStore = create((set) => ({
  restaurantInfo: null,
  restaurantHours: null,
  restaurantAddress: null,
  isLoading: false,
  error: null,

  fetchRestaurantInfo: async (productId) => {
    set({ isLoading: true, error: null })
    try {
      const restaurantInfo =
        await restaurantService.fetchRestaurantInfoByProductId(productId)
      set({ restaurantInfo })
    } catch (error) {
      set({
        error:
          "Não foi possível carregar as informações do restaurante. " + error,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchRestaurantHours: async (restaurantId) => {
    set({ isLoading: true, error: null })
    try {
      const restaurantHours =
        await restaurantService.fetchRestaurantHoursById(restaurantId)
      set({ restaurantHours })
    } catch (error) {
      set({
        error: "Não foi possível carregar os horários do restaurante. " + error,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchAddress: async (restaurantId) => {
    set({ isLoading: true, error: null })
    try {
      const restaurantAddress =
        await restaurantService.fetchAddressByRestaurantId(restaurantId)
      set({ restaurantAddress })
    } catch (error) {
      set({
        error: "Não foi possível carregar o endereço do restaurante. " + error,
      })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default restaurantStore
