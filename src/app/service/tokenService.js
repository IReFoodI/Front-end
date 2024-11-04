import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "/api/token"

async function getInfoUsingToken() {
  const axios = createAxiosInstance(true)
  const response = await axios.get(`${BASE_URL}/info`)
  return response
}

export const tokenService = { getInfoUsingToken }
