import { useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { fetchAllProducts } from "@/domains/store/services/productService"

export function useProducts() {
  const [products, setProducts] = useState([])

  const { loading, onRequest, error } = useFetch()

  useEffect(() => {
    const fetchProducts = async () => {
      await onRequest({
        request: fetchAllProducts,
        onSuccess: async (productsRes) => {
          setProducts(productsRes)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchProducts()
  }, [onRequest, error])

  return { products, loading }
}

// Função para decodificar o token JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    console.error("Token inválido", e)
    return null
  }
}
