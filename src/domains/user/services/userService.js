import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "/api/user"

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
  const axios = createAxiosInstance()
  return await axios.post(BASE_URL, data)
  // return await axios({ url: "/api/user", method: "POST", data })
}

async function getUser() {
  const axios = createAxiosInstance(true)
  const response = await axios.get(`auth/user/info`)
  return response
}

async function getUserById(userId) {
  const axios = createAxiosInstance(true)
  return axios.get(`api/user/${userId}`)
}

async function getTransactionById(transactionId) {
  const axios = createAxiosInstance(true)
  return axios.get(`/transaction/${transactionId}`)
}

async function getUsers() {
  const axios = createAxiosInstance(true)
  return axios.get("api/user/users")
}

export const userService = {
  createUserAccount,
  getUser,
  getUserById,
  getUsers,
  getTransactionById,
}
