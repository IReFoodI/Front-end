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

/**
 * Fetch restaurant details by product ID
 *
 * @param {number} productId - The ID of the product.
 * @returns {Promise<string>} - Returns the name of the restaurant.
 */
async function fetchRestaurantNameByProductId(productId) {
  const axios = createAxiosInstance(true)
  const response = await axios.get(`/api/product/${productId}/restaurant`)
  return response.data
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

/**
 * Remove an item from the cart
 *
 * @param {number} cartId - The ID of the cart.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<void>}
 */
async function removeAllItemFromCart(cartId, productId) {
  const axios = createAxiosInstance(true)
  await axios.delete(
    `${BASE_URL}/del/item/all?cartId=${cartId}&productId=${productId}`
  )
}

/**
 * Adds an item to the user's cart.
 *
 * @async
 * @param {Object} params - The request parameters.
 * @param {number} params.userId - The user's ID.
 * @param {number} params.productId - The product's ID.
 * @param {number} params.quantity - The quantity of the product.
 *
 * @throws {Error} If `userId` is missing.
 *
 * @returns {Promise<Object>} The response data with the updated cart details.
 */
async function addItemCart({ userId, productId, quantity }) {
  if (!userId) {
    throw new Error("User ID is required to fetch the cart")
  }
  const axios = createAxiosInstance(true)
  const response = await axios.post(
    `${BASE_URL}/user/${userId}/add-item?productId=${productId}&quantity=${quantity}`
  )
  return response.data
}

export const cartService = {
  fetchCart,
  clearCart,
  addItemCart,
  fetchRestaurantNameByProductId,
  removeItemFromCart,
  removeAllItemFromCart,
}
