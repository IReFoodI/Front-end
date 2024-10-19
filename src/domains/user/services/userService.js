// import { createAxiosInstance } from "@/app/service/axiosConfig"
import { fetchFunction } from "@/app/service/fetchFunction"
// import { fetchFunction } from "@/app/service/fetchFunction"
// const BASE_URL = "/api/user"
// const axios = createAxiosInstance()

/**
 * Create user
 *
 * @param {Object} data - The user data object.
 * @param {string} data.name - The first name of the user.
 * @param {string} data.surname - The last name of the user.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.phone - The phone number of the user.
 * @param {string} data.password - The user's password (hashed or plain).
 */
async function createUserAccount(data) {
  // return await axios.post(BASE_URL, data)
  return await fetchFunction({ url: "/api/user", method: "POST", data })
}

export const userService = { createUserAccount }
