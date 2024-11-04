import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const HOME_URL = "/api/restaurant"
const FAVORITES_URL = "/api/favorites"

async function getStores() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${HOME_URL}`)
}

async function getStoresToday() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${HOME_URL}/today`)
}

async function getFavoritesByUser() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${FAVORITES_URL}/user`)
}

async function addFavorite(data) {
  const axios = createAxiosInstance(true)
  return await axios.post(`${FAVORITES_URL}`, data)
}

async function deleteFavorite(id) {
  const axios = createAxiosInstance(true)
  return await axios.delete(`${FAVORITES_URL}/${id}`)
}

export const storesCardsServices = {
  getStores,
  getStoresToday,
  getFavoritesByUser,
  addFavorite,
  deleteFavorite,
}
