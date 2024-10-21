import axios from "axios"
import { useEffect, useState } from "react"

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product")
        const productsData = response.data

        console.log(productsData)
        setProducts(productsData)
        localStorage.setItem("productsData", JSON.stringify(productsData))
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading }
}
