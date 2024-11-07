import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const orderService = {
  async fetchOrders(userId) {
    const axiosInstance = createAxiosInstance(true)
    try {
      const response = await axiosInstance.get(`/api/order/user/${userId}`)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
      throw error
    }
  },

  async fetchRestaurantDetails(restaurantId) {
    const axiosInstance = createAxiosInstance(true)
    try {
      const response = await axiosInstance.get(
        `/api/restaurant/${restaurantId}`
      )
      return response.data
    } catch (error) {
      console.error("Erro ao buscar detalhes do restaurante:", error)
      throw error
    }
  },
}

export default orderService
