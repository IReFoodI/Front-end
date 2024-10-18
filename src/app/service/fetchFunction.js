import axios from "axios"

import { getLocalStorageToken } from "../utils/storage-token"

export async function fetchFunction({
  url = "",
  method = "GET",
  headers = {},
  data,
  privateRoute = false,
  ...rest
}) {
  const baseApiUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8080"

  if (privateRoute) {
    const token = getLocalStorageToken()
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }

  const response = await axios(`${baseApiUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
    data,
    ...rest,
  })

  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    return { error: false, data: response.data }
  }
  if (response.status >= 400) {
    return { error: true, data: response.data }
  }

  return { error: false, data: response.data }
}
