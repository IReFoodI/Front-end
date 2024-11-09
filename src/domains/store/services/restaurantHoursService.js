import { createAxiosInstance } from "@/app/utils/createAxiosInstance"

const BASE_URL = "/api/restaurant-hours"

export async function fetchRestaurantHours() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/restaurant`)
}

export async function getRestaurantHoursById(id) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/restaurant-id/${id}`)
}

export async function fetchAllRestaurantHoursToday() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/today`)
}

export async function addRestaurantHours(data) {
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
