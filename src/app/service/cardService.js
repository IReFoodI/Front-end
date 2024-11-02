import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const BASE_URL = "/api/card"

const cardService = {
  async fetchUserCards() {
    const axiosInstance = createAxiosInstance(true)
    try {
      const response = await axiosInstance.get(BASE_URL)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar cartões:", error)
      throw error
    }
  },

  async deleteCard(cardId) {
    const axiosInstance = createAxiosInstance(true)
    try {
      await axiosInstance.delete(`${BASE_URL}/${cardId}`)
    } catch (error) {
      console.error("Erro ao deletar cartão:", error)
      throw error
    }
  },
}

export default cardService
