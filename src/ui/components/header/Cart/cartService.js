// src/service/cartService.js
import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const BASE_URL = "/api/cart"

/**
 * Fetch cart items for a user
 *
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} - Returns the cart items.
 */
async function fetchCart(userId) {
  const axios = createAxiosInstance(true)
  const response = await axios.get(`${BASE_URL}/user/${userId}`)
  return response.data
}

/**
 * Clear the user's cart
 *
 * @param {number} cartId - The ID of the cart to clear.
 * @returns {Promise<void>}
 */
async function clearCart(cartId) {
  const axios = createAxiosInstance(true)
  await axios.delete(`${BASE_URL}/${cartId}/clear`)
}

export const cartService = {
  fetchCart,
  clearCart,
}
