import axios from "axios"

import { getLocalStorageToken } from "../utils/storage-token"

export async function fetchFunction({
  url = "",
  method = "GET",
  headers = {},
  body,
  privateRoute = false,
  ...rest
}) {
  const baseApiUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8080"

  let token

  if (privateRoute) {
    token = getLocalStorageToken()
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  try {
    const response = await axios(`${baseApiUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
      body,
      ...rest,
    })

    if (response.status >= 200 && response.status < 300) {
      return { error: false, response: response.data }
    }

    return { error: true, response: response.data }
  } catch (error) {
    console.log(error)
    console.log("Ocorreu um erro ao tentar realizar a requisição")
    return {
      error: true,
      response: { errorMessage: error.message },
      errorMessage: error,
    }
  }
}
