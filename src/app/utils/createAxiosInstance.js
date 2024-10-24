import axios from "axios"

import { localStorageUtil } from "../utils/localStorageUtil"

const baseApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080"

export const createAxiosInstance = (privateRoute = false) => {
  let headers = {}

  if (privateRoute) {
    const token = localStorageUtil.getLocalStorageToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  return axios.create({
    baseURL: baseApiUrl,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  })
}
