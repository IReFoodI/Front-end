// import { createAxiosInstance } from "@/app/service/axiosConfig"
import { fetchFunction } from "@/app/service/fetchFunction"
// import { fetchFunction } from "@/app/service/fetchFunction"

/**
 * SignIn
 *
 * @param {Object} data - The user data object.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.password - The user's password (hashed or plain).
 */
async function signInWithEmailAndPassword(data) {
  // return await axios.post(BASE_URL, data)
  console.log(data)

  const response = await fetchFunction({
    method: "POST",
    data,
    url: "/auth/login",
  })
  console.log(response)
  if (response?.error) {
    return {
      ...response,
      errorMessage: "Ocorreu um erro ao tentar realizar o login",
    }
  }
  return response
}

export { signInWithEmailAndPassword }
