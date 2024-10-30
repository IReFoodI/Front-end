import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const BASE_URL = "/api/address"

/**
 * Create address
 *
 * @param {Object} data - The address data object.
 * @param {string} data.cep - The postal code of the address.
 * @param {string} data.state - The state abbreviation.
 * @param {string} data.district - The district of the address.
 * @param {string} data.street - The street name.
 * @param {string} data.number - The street number.
 * @param {string} data.complement - Any additional address information (e.g., apartment number).
 * @param {string} data.addressType - The type of address (e.g., home, work).
 */
async function createAddress(data) {
  const axios = createAxiosInstance(true)
  return await axios.post(BASE_URL, data)
}

/**
 * Update address
 *
 * @param {Object} data - The address data object.
 * @param {number} data.addressId - The ID of the address.
 * @param {string} data.cep - The postal code of the address.
 * @param {string} data.state - The state abbreviation.
 * @param {string} data.district - The district of the address.
 * @param {string} data.street - The street name.
 * @param {string} data.number - The street number.
 * @param {string} data.complement - Any additional address information (e.g., apartment number).
 * @param {string} data.addressType - The type of address (e.g., home, work).
 */
async function updateAddress(data) {
  const axios = createAxiosInstance(true)
  return await axios.put(`${BASE_URL}/${data.addressId}`, data)
}

async function listAddresses() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/user`)
}

async function getAddressById(id) {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/me/${id}`)
}
async function deleteAddressById(id) {
  const axios = createAxiosInstance(true)
  return await axios.delete(`${BASE_URL}/${id}`)
}
async function patchAddressById(id) {
  const axios = createAxiosInstance(true)
  return await axios.patch(`${BASE_URL}/${id}`)
}
async function getAddressDefault() {
  const axios = createAxiosInstance(true)
  return await axios.get(`${BASE_URL}/default`)
}
export const addressService = {
  createAddress,
  listAddresses,
  getAddressById,
  updateAddress,
  deleteAddressById,
  patchAddressById,
  getAddressDefault,
}
