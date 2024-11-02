import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const BASE_URL = "/api/restaurant"

const restaurantService = {
  async fetchRestaurantInfoByProductId(productId) {
    const axiosInstance = createAxiosInstance(true)
    try {
      const response = await axiosInstance.get(
        `/api/product/${productId}/restaurant-info`
      )
      return response.data
    } catch (error) {
      console.error("Erro ao buscar informações do restaurante:", error)
      throw error
    }
  },
}

export default restaurantService
