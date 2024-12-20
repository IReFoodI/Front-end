import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/card"

async function createCreditCard(data) {
  const axios = createAxiosInstance(true)
  return await axios.post(BASE_URL, data)
}

async function updateCreditCard(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(`${BASE_URL}/${data?.cardId}`, data)
}

async function getCreditCardById(id) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/${id}`)
}
async function getAllCreditCard() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}`)
}

async function deleteCreditCard(id) {
  const axios = createAxiosInstance(true)
  return await axios.delete(`${BASE_URL}/${id}`)
}

async function fetchUserCards() {
  const axiosInstance = createAxiosInstance(true)
  try {
    const response = await axiosInstance.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error("Erro ao buscar cartões:", error)
    throw error
  }
}

async function deleteCard(cardId) {
  const axiosInstance = createAxiosInstance(true)
  try {
    await axiosInstance.delete(`${BASE_URL}/${cardId}`)
  } catch (error) {
    console.error("Erro ao deletar cartão:", error)
    throw error
  }
}

export {
  createCreditCard,
  deleteCard,
  deleteCreditCard,
  fetchUserCards,
  getAllCreditCard,
  getCreditCardById,
  updateCreditCard,
}
