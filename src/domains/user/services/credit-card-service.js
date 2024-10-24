import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/card"
const axios = createAxiosInstance(true)

async function createCreditCard(data) {
  return await axios.post(BASE_URL, data)
}

async function updateCreditCard(data) {
  return await axios.put(BASE_URL, data)
}

async function getCreditCard() {
  return await axios.get(`${BASE_URL}/user`)
}

async function deleteCreditCard() {
  return await axios.delete(`${BASE_URL}/user`)
}

export { createCreditCard, deleteCreditCard, getCreditCard, updateCreditCard }
