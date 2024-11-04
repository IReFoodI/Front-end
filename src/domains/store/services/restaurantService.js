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
async function updateRestaurant(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(BASE_URL, data)
}
async function getRestaurantHistoricalOrders(restaurantId) {
  const axios = createAxiosInstance(true)
  return await axios.get(`api/historical-orders/restaurant/${restaurantId}`)
}
async function getOrderItems() {
  const axios = createAxiosInstance(true)
  return await axios.get("api/order-items")
}
async function getProductById(productId) {
  const axios = createAxiosInstance(true)
  return await axios.get(`api/product/${productId}`)
}

export const restaurantService = {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  getRestaurantHistoricalOrders,
  getOrderItems,
  getProductById,
}
