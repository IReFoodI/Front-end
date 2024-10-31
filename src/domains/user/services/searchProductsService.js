import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "api/product/search"
const axios = createAxiosInstance(true)

async function searchProducts(searchString) {
  console.log(searchString)
  return await axios.get(`${BASE_URL}?produto=${searchString}`)
}

export { searchProducts }
