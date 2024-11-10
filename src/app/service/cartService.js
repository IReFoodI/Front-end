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
  if (!userId) {
    throw new Error("User ID is required to fetch the cart")
  }
  const axios = createAxiosInstance(true)
  const response = await axios.get(`${BASE_URL}/user/${userId}`)
  return response
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

/**
 * Fetch restaurant details by product ID
 *
 * @param {number} productId - The ID of the product.
 * @returns {Promise<string>} - Returns the name of the restaurant.
 */
async function fetchRestaurantNameByProductId(productId) {
  const axios = createAxiosInstance(true)
  const response = await axios.get(`/api/product/${productId}/restaurant`)
  return response
}

/**
 * Remove an item from the cart
 *
 * @param {number} cartId - The ID of the cart.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<void>}
 */
async function removeItemFromCart(cartId, productId) {
  const axios = createAxiosInstance(true)
  await axios.delete(
    `${BASE_URL}/cart/item?cartId=${cartId}&productId=${productId}`
  )
}

export const cartService = {
  fetchCart,
  clearCart,
  fetchRestaurantNameByProductId,
  removeItemFromCart,
}
