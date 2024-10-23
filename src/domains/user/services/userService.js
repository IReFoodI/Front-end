import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "/api/user"
const axios = createAxiosInstance(true)

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
  return await axios.post(BASE_URL, data)
  // return await axios({ url: "/api/user", method: "POST", data })
}

async function getUser() {
  //todo falta ver a rota pra pegar as informações do usuario
  const response = await axios.get(`${BASE_URL}`)
  return response
}

export const userService = { createUserAccount, getUser }
