import axios from "axios"

export async function fetchAddressData(reset, setError) {
  try {
    const response = await axios.get("http://localhost:8080/api/address/1")
    reset(response.data)
    setError(null)
    return response.data
  } catch (err) {
    console.error("Erro ao buscar dados:", err)
  }
}

export async function updateAddress(addressId, data, setError) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/address/${addressId}`,
      data
    )
    setError(null)
    return response.data
  } catch (err) {
    console.error("Erro ao atualizar endereço:", err)
    setError("Erro ao atualizar endereço.")
  }
}
