import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/firebase"

async function createRestaurantImage({ imageFile }) {
  const axios = createAxiosInstance(true)
  const formData = new FormData()
  formData.append("file", imageFile)

  return await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
export const restaurantImageService = {
  createRestaurantImage,
}
