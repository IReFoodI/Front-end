import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/address"

export async function fetchAllAddress() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}`)
}