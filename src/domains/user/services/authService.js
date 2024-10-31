import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "/auth"

/**
 * SignIn
 *
 * @param {Object} data - The user data object.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.password - The user's password (hashed or plain).
 */
async function signInWithEmailAndPassword(data, isBusinessPage) {
  const axios = createAxiosInstance()
  const url = isBusinessPage
    ? `${BASE_URL}/restaurant/login`
    : `${BASE_URL}/user/login`

  return await axios.post(url, data)
}

export const authService = { signInWithEmailAndPassword }
