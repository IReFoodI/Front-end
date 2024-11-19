import { create } from "zustand"

import { restaurantServiceMarina } from "@/app/service/restaurantServiceMarina"

const restaurantStore = create((set) => ({
  restaurantInfo: null,
  restaurantHours: null,
  restaurantAddress: null,
  isLoading: false,
  error: null,

  fetchRestaurantInfo: async (productId) => {
    set({ isLoading: true, error: null })
    try {
      const { data } =
        await restaurantServiceMarina.fetchRestaurantInfoByProductId(productId)
      set({ restaurantInfo: data })
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
      const { data } =
        await restaurantServiceMarina.fetchRestaurantHoursById(restaurantId)
      set({ restaurantHours: data })
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
      const { data } =
        await restaurantServiceMarina.fetchAddressByRestaurantId(restaurantId)
      set({ restaurantAddress: data })
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
