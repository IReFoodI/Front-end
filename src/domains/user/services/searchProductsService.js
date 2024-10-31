import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "api/product/search"
const axios = createAxiosInstance(true)

async function searchProducts(searchParams) {
  console.log(searchParams)
  return await axios.get(`${BASE_URL}?${searchParams}`)
}

export { searchProducts }
