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
async function getRestaurantOrders(restaurantId) {
  const axios = createAxiosInstance(true)
  return await axios.get(`api/order/restaurant/${restaurantId}`)
}
async function getProductById(productId) {
  const axios = createAxiosInstance(true)
  return await axios.get(`/api/product/${productId}`)
}
async function updateStatusOrder(orderId, status) {
  const axios = createAxiosInstance(true)
  return await axios.patch(`/api/order/${orderId}/status?newStatus=${status}`)
}
async function getProducts() {
  const axios = createAxiosInstance(true)
  return await axios.get("/api/product")
}

export const restaurantService = {
  createRestaurant,
  getRestaurantEmail,
  updateRestaurant,
  getRestaurantOrders,
  getProductById,
  updateStatusOrder,
  getRestaurantById,
  getProducts,
}
