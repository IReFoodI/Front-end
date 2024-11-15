import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/restaurant-hours"

// busca o horário do restaurante no dia atual - ou deveria
async function fetchRestaurantHourTodayById(id) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/${id}`)
}

// busca o horário de todos os restaurantes
async function fetchRestaurantHours() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/restaurant`)
}

// retorna os horários de um restaurante
async function getRestaurantAllHoursById(id) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/restaurant-id/${id}`)
}

// retorna as horas dos restaurantes por dia
async function fetchRestaurantHoursToday() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/today`)
}

async function addRestaurantHours(data) {
  if (data.id) {
    if (data.enabled) {
      const axios = createAxiosInstance(true)
      return await axios.put(`${BASE_URL}/${data.id}`, data)
    } else {
      const axios = createAxiosInstance(true)
      return await axios.delete(`${BASE_URL}/${data.id}`)
    }
  } else if (data.enabled) {
    const axios = createAxiosInstance(true)
    return await axios.post(`${BASE_URL}`, data)
  }
}

async function fetchRestaurantHoursById(restaurantId) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/restaurant-id/${restaurantId}`)
}

export {
  addRestaurantHours,
  fetchRestaurantHours,
  fetchRestaurantHoursById,
  fetchRestaurantHoursToday,
  fetchRestaurantHourTodayById,
  getRestaurantAllHoursById,
}
