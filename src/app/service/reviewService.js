import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const reviewService = {
  async createReview(reviewData) {
    const axiosInstance = createAxiosInstance(true)
    try {
      const response = await axiosInstance.post("/api/review", reviewData)
      return response
    } catch (error) {
      console.error("Erro ao enviar a avaliação:", error)
      throw error
    }
  },
}

export default reviewService
