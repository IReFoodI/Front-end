import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const BASE_URL = "/api/product"

async function getRestaurantProducts(page) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/products?page=${page}`)
}

async function postRestaurantProducts(data) {
  const axios = createAxiosInstance(true)
  return await axios.post(`${BASE_URL}`, data)
}

async function deleteProduct(id) {
  const axios = createAxiosInstance(true)
  return {
    data: await axios.delete(`${BASE_URL}/${id}`),
  }
}

async function updateProduct(id, data) {
  const axios = createAxiosInstance(true)
  return await axios.patch(`${BASE_URL}/${id}`, data)
}

export const productService = {
  getRestaurantProducts,
  postRestaurantProducts,
  deleteProduct,
  updateProduct,
}
