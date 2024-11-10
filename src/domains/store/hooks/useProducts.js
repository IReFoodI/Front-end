import { useEffect } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { fetchAllProducts } from "@/domains/store/services/productService"

export function useProducts() {
  const { data: products, loading, onRequest, error } = useFetch()
  useEffect(() => {
    console.log("useProducts:::::fetchProducts")
    const fetchProducts = async () => {
      await onRequest({
        request: fetchAllProducts,
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }
    fetchProducts()
  }, [onRequest, error])
  return { products: products || [], loading }
}
