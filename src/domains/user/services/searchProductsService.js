import { createAxiosInstance } from "@/app/service/createAxiosInstace"
const BASE_URL = "api/product/search"
const axios = createAxiosInstance(true)

async function searchProducts(searchParams) {
  console.log(searchParams)
  let transformed = searchParams?.replace(
    /(tipo=)([^&]*)|(categoria=)([^&]*)/g,
    (match, tipo, tipoValue, categoria, categoriaValue) => {
      if (tipo) {
        return tipo + tipoValue.toUpperCase() // Transforma o valor de tipo em uppercase
      } else if (categoria) {
        return categoria + categoriaValue.toUpperCase() // Transforma o valor de categoria em uppercase
      }
      return match
    }
  )
  return await axios.get(`${BASE_URL}?${transformed}`)
}

export { searchProducts }
