import { create } from "zustand"

import restaurantService from "@/app/service/restaurantService"

const restaurantStore = create((set) => ({
  restaurantInfo: null,
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
}))

export default restaurantStore
