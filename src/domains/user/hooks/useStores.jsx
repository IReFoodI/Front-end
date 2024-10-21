import axios from "axios"
import { useEffect, useState } from "react"

export function useStores() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStoresAndHours = async () => {
      try {
        const [storesRes, hoursRes] = await Promise.all([
          axios.get("http://localhost:8080/api/restaurants"),
          axios.get("http://localhost:8080/api/restaurant-hours/today"),
        ])

        const storesData = storesRes.data
        const hoursData = hoursRes.data

        const mergedData = storesData.map((store) => ({
          ...store,
          hours: hoursData.filter(
            (hour) => hour.restaurantId === store.restaurantId
          ),
        }))

        console.log(mergedData)
        setStores(mergedData)
        localStorage.setItem("storesData", JSON.stringify(mergedData))
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStoresAndHours()
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
