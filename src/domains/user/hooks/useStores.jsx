import axios from "axios"
import { useCallback, useEffect, useState } from "react"

import useFetch from "@/app/hooks/useFetch"

export function useStores() {
  const [stores, setStores] = useState([])
  const { loading, onRequest, error } = useFetch()

  const userId = 1 // tem que trocar pela chamada do usuario logado

  const fetchFavorites = useCallback(
    async (storesData) => {
      await onRequest({
        request: async () =>
          axios.get(`http://localhost:8080/api/favorites/user/${userId}`),
        onSuccess: async (favRes) => {
          const updatedStores = storesData.map((store) => {
            const favorite = favRes.find(
              (fav) => fav.restaurantId === store.restaurant.restaurantId
            )
            return {
              ...store,
              isFavorited: !!favorite,
              favoriteId: favorite ? favorite.favoriteId : null,
            }
          })
          setStores(updatedStores)
          localStorage.setItem("storesData", JSON.stringify(updatedStores))
        },
        onError: () =>
          console.error("Erro ao buscar dados dos favoritos:", error),
      })
    },
    [onRequest, userId, error]
  )

  useEffect(() => {
    const fetchStores = async () => {
      await onRequest({
        request: async () =>
          axios.get("http://localhost:8080/api/restaurants/today"),
        onSuccess: async (storesRes) => {
          const storesData = storesRes
          setStores(storesData)
          await fetchFavorites(storesData)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchStores()
  }, [onRequest, error, fetchFavorites])

  const addFavorite = async (userId, restaurantId) => {
    await onRequest({
      request: async () =>
        axios.post(`http://localhost:8080/api/favorites`, {
          userId,
          restaurantId,
        }),
      onSuccess: async () => {
        console.log("Atualizado com sucesso")
        await refreshStores()
      },
      onError: () => console.error("Erro ao atualizar favorito:", error),
    })
  }

  const deleteFavorite = async (favoriteId) => {
    await onRequest({
      request: async () =>
        axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`),
      onSuccess: async () => {
        console.log("Atualizado com sucesso")
        await refreshStores()
      },
      onError: () => console.error("Erro ao atualizar favorito:", error),
    })
  }

  const toggleFavorite = async (restaurantId, favoriteId) => {
    const updatedStores = stores.map((store) =>
      store.restaurant.restaurantId === restaurantId
        ? { ...store, isFavorited: !store.isFavorited }
        : store
    )
    if (favoriteId) {
      await deleteFavorite(favoriteId)
    } else await addFavorite(userId, restaurantId)
    setStores(updatedStores)
    localStorage.setItem("storesData", JSON.stringify(updatedStores))
  }

  const refreshStores = async () => {
    await onRequest({
      request: async () =>
        axios.get("http://localhost:8080/api/restaurants/today"),
      onSuccess: async (storesRes) => {
        const storesData = storesRes
        await fetchFavorites(storesData)
      },
      onError: () => console.error("Erro ao atualizar dados:", error),
    })
  }

  return { stores, loading, toggleFavorite, error }
}
