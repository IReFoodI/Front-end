import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/product"

export async function fetchAllProducts() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}`)
}