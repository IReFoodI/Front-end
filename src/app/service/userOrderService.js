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

  async createOrder(orderData) {
    const axiosInstance = createAxiosInstance(true)
    try {
      const response = await axiosInstance.post("/api/order", orderData)
      return response
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
      throw error
    }
  },

  async createTransaction(transactionData) {
    const axiosInstance = createAxiosInstance(false)
    try {
      const response = await axiosInstance.post(
        "/api/transaction",
        transactionData
      )
      return response
    } catch (error) {
      console.error("Erro ao criar transação:", error)
      throw error
    }
  },
}

export default orderService
