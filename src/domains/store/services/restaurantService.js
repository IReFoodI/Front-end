import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/restaurant"

async function createRestaurant(data) {
  const axios = createAxiosInstance(true)
  return await axios.post(BASE_URL, data)
}
async function getRestaurantById(id) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/${id}`)
}
async function getRestaurantEmail() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/email`)
}
async function updateRestaurant(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(BASE_URL, data)
}
async function updateRestaurantEmail(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(`${BASE_URL}/email`, data)
}
async function updateRestaurantPassword(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(`${BASE_URL}/password`, data)
}

export const restaurantService = {
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  getRestaurantEmail,
  updateRestaurantEmail,
  updateRestaurantPassword,
}
