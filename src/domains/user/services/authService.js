import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "/auth"

/**
 * SignIn
 *
 * @param {Object} data - The user data object.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.password - The user's password (hashed or plain).
 */
async function signInWithEmailAndPassword(data) {
  const axios = createAxiosInstance()
  return await axios.post(`${BASE_URL}/login`, data)
}

export const authService = { signInWithEmailAndPassword }
