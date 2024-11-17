import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "/api/token"

async function getInfoUsingToken() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/info`)
}

export const tokenService = { getInfoUsingToken }
