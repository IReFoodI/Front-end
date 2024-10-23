import { createAxiosInstance } from "@/app/service/createAxiosInstace"

const BASE_URL = "/api/address"
const axios = createAxiosInstance(true)

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
 * @param {boolean} data.isStandard - Indicates if this is a standard address.
 */
async function createAddress(data) {
  return await axios.post(BASE_URL, data)
}

async function listAddresses() {
  return await axios.get(`${BASE_URL}/user`)
}

export const addressService = { createAddress, listAddresses }
