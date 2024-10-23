// import { createAxiosInstance } from "@/app/service/axiosConfig"
// import { fetchFunction } from "@/app/service/fetchFunction"

import { createAxiosInstance } from "@/app/service/createAxiosInstace"

// import { fetchFunction } from "@/app/service/fetchFunction"

const BASE_URL = "/auth/login"

const axios = createAxiosInstance()
/**
 * SignIn
 *
 * @param {Object} data - The user data object.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.password - The user's password (hashed or plain).
 */
async function signInWithEmailAndPassword(data) {
  return await axios.post(BASE_URL, data)
}

export const authService = { signInWithEmailAndPassword }
