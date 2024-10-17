import axios from "axios"
import { useEffect, useState } from "react"

export function useStores() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/restaurants"
        )
        console.log(data)
        setStores(data)
        localStorage.setItem("storesData", JSON.stringify(data))
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStores()
  }, [])

  const toggleFavorite = (restaurantId) => {
    const updatedStores = stores.map((store) =>
      store.restaurantId === restaurantId
        ? { ...store, isFavorited: !store.isFavorited }
        : store
    )
    setStores(updatedStores)
    localStorage.setItem("storesData", JSON.stringify(updatedStores))
  }

  return { stores, loading, toggleFavorite }
}
