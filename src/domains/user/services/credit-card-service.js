import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/card"
const axios = createAxiosInstance(true)

async function createCreditCard(data) {
  return await axios.post(BASE_URL, data)
}

async function updateCreditCard(data) {
  return await axios.put(`${BASE_URL}/${data?.cardId}`, data)
}

async function getCreditCardById(id) {
  return await axios.get(`${BASE_URL}/${id}`)
}
async function getAllCreditCard() {
  return await axios.get(`${BASE_URL}`)
}

async function deleteCreditCard(id) {
  return await axios.delete(`${BASE_URL}/${id}`)
}

export {
  createCreditCard,
  deleteCreditCard,
  getAllCreditCard,
  getCreditCardById,
  updateCreditCard,
}
