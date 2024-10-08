import { useEffect, useState } from "react"

import { storesData as initialStoresData } from "../models/storesData"

export function useStores() {
  const [stores, setstores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedStores = localStorage.getItem("storesData")

    if (storedStores) {
      setstores(JSON.parse(storedStores))
      setLoading(false)
    } else {
      setTimeout(() => {
        setstores(initialStoresData)
        localStorage.setItem("storesData", JSON.stringify(initialStoresData))
        setLoading(false)
      }, 100)
    }
  }, [])

  const toggleFavorite = (id) => {
    const updatedStores = stores.map((store) =>
      store.id === id ? { ...store, isFavorited: !store.isFavorited } : store
    )
    setstores(updatedStores)
    localStorage.setItem("storesData", JSON.stringify(updatedStores))
  }

  return { stores, loading, toggleFavorite }
}
