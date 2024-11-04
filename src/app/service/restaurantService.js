import { createAxiosInstance } from "@/app/service/createAxiosInstace"

// const BASE_URL = "/api/restaurant"

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

  async fetchRestaurantHoursById(restaurantId) {
    const axiosInstance = createAxiosInstance(false)
    try {
      const response = await axiosInstance.get(
        `/api/restaurant-hours/restaurant-id/${restaurantId}`
      )
      return response.data
    } catch (error) {
      console.error("Erro ao buscar horários do restaurante:", error)
      throw error
    }
  },

  async fetchAddressByRestaurantId(restaurantId) {
    const axiosInstance = createAxiosInstance(true)
    try {
      const response = await axiosInstance.get(
        `/api/address/restaurant/${restaurantId}`
      )
      return response.data
    } catch (error) {
      console.error("Erro ao buscar endereço do restaurante:", error)
      throw error
    }
  },
}

export default restaurantService
