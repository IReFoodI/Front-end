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

  const response = await fetch(`${baseApiUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
    body: JSON.stringify(body),
    ...rest,
  })

  if (response.ok) {
    const responseData = await response.json()

    return { error: false, responseData }
  }

  const responseData = await response.json()

  return { error: true, responseData }
}
