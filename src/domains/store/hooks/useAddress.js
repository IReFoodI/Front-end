import axios from "axios"

export async function fetchAddressData(reset, setError) {
  try {
    const response = await axios.get("http://localhost:8080/api/address/1")
    reset(response.data)
    setError(null)
  } catch (err) {
    console.error("Erro ao buscar dados:", err)
    setError("Falha ao carregar o endereço.")
  }
}
