import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const BASE_URL = "/api/open-bag"

/**
 * Listar itens do Open Bag
 */
async function listOpenBagItems() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/items`)
}

/**
 * Atualizar o item no Open Bag
 *
 * @param {Object} data - O item a ser atualizado.
 * @param {number} data.itemId - O ID do item.
 * @param {number} data.quantity - A nova quantidade do item.
 */
async function updateOpenBagItem(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(`${BASE_URL}/items/${data.itemId}`, data)
}

/**
 * Remover item do Open Bag
 *
 * @param {number} itemId - O ID do item a ser removido.
 */
async function deleteOpenBagItem(itemId) {
  const axios = createAxiosInstance(true)
  return await axios.delete(`${BASE_URL}/items/${itemId}`)
}

async function fetchOpenBagItems() {
  const axios = createAxiosInstance(true)
  return await axios.get(BASE_URL)
}

async function addItemToOpenBag(item) {
  const axios = createAxiosInstance(true)
  return await axios.post(BASE_URL, item)
}

async function removeItemFromOpenBag(itemId) {
  const axios = createAxiosInstance(true)
  return await axios.delete(`${BASE_URL}/${itemId}`)
}

export const openBagService = {
  listOpenBagItems,
  updateOpenBagItem,
  deleteOpenBagItem,
  fetchOpenBagItems,
  addItemToOpenBag,
  removeItemFromOpenBag,
}
