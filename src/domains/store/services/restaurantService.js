import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/restaurant"

async function createRestaurant(data) {
  const axios = createAxiosInstance(true)
  return await axios.post(BASE_URL, data)
}
async function getRestaurant() {
  const axios = createAxiosInstance(true)
  return await axios.get(BASE_URL)
}
async function getRestaurants() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/restaurants`)
}
async function updateRestaurant(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(BASE_URL, data)
}

export const restaurantService = {
  createRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
}
