import { createAxiosInstance } from "@/app/service/createAxiosInstace"

// const BASE_URL = "/api/restaurant"

const restaurantService = {
  async fetchRestaurantProductsByRestaurantId(id) {
    const axiosInstance = createAxiosInstance(true)
    try {
      return await axiosInstance.get(`/api/product/restaurant/${id}`)
    } catch (error) {
      console.error("Erro ao buscar informações do restaurante:", error)
      throw error
    }
  },

  async fetchRestaurantInfoByProductId(productId) {
    const axiosInstance = createAxiosInstance(true)
    try {
      return await axiosInstance.get(
        `/api/product/${productId}/restaurant-info`
      )
    } catch (error) {
      console.error("Erro ao buscar informações do restaurante:", error)
      throw error
    }
  },

  async fetchRestaurantHoursById(restaurantId) {
    const axiosInstance = createAxiosInstance(false)
    try {
      return await axiosInstance.get(
        `/api/restaurant-hours/restaurant-id/${restaurantId}`
      )
    } catch (error) {
      console.error("Erro ao buscar horários do restaurante:", error)
      throw error
    }
  },

  async fetchAddressByRestaurantId(restaurantId) {
    const axiosInstance = createAxiosInstance(true)
    try {
      return await axiosInstance.get(`/api/address/restaurant/${restaurantId}`)
    } catch (error) {
      console.error("Erro ao buscar endereço do restaurante:", error)
      throw error
    }
  },
}

export default restaurantService
