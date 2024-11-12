import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/firebase"

async function uploadImage({ imageFile }) {
  const axios = createAxiosInstance(true)
  const formData = new FormData()
  formData.append("file", imageFile)

  return await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

async function deleteImage(imageUrl) {
  if (!imageUrl) return
  const imageName = imageUrl.split("/").pop().split("?")[0]
  const axios = createAxiosInstance(true)
  return await axios.delete(`${BASE_URL}/image/${imageName}`)
}

async function getImage(imageUrl) {
  if (!imageUrl) return
  const imageName = imageUrl.split("/").pop().split("?")[0]
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/image/${imageName}`)
}

export const imageService = {
  uploadImage,
  deleteImage,
  getImage,
}
