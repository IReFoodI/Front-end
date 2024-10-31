import axios from "axios"
import { useCallback, useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { storesCardsServices } from "@/domains/user/services/storesServices"

export function useStores() {
  const [stores, setStores] = useState([])
  const { onRequest, error } = useFetch()
  const userId = 1

  const fetchFavorites = useCallback(
    async (storesData) => {
      await onRequest({
        request: async () => storesCardsServices.getFavoritesByUser(),
        onSuccess: (favRes) => {
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
    [onRequest, error]
  )

  useEffect(() => {
    const fetchStores = async () => {
      await onRequest({
        request: async () => storesCardsServices.getStoresToday(),
        onSuccess: async (storesRes) => {
          const storesData = storesRes
          setStores(storesData)
          await fetchFavorites(storesData)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchStores()
  }, [onRequest, error])

  const addFavorite = async (userId, restaurantId) => {
    await onRequest({
      request: async () =>
        axios.post(`http://localhost:8080/api/favorites`, {
          userId,
          restaurantId,
        }),
      onSuccess: async () => {
        console.log("Atualizado com sucesso")
        refreshStores()
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
        refreshStores()
      },
      onError: () => console.error("Erro ao atualizar favorito:", error),
    })
  }

  const toggleFavorite = (restaurantId, favoriteId) => {
    // Atualização otimista do estado de 'stores'
    const updatedStores = stores.map((store) =>
      store.restaurant.restaurantId === restaurantId
        ? { ...store, isFavorited: !store.isFavorited }
        : store
    )
    setStores(updatedStores)
    localStorage.setItem("storesData", JSON.stringify(updatedStores))

    // Chamada de API em segundo plano
    if (favoriteId) {
      deleteFavorite(favoriteId)
    } else {
      addFavorite(userId, restaurantId)
    }
  }

  const refreshStores = async () => {
    await onRequest({
      request: async () =>
        axios.get("http://localhost:8080/api/restaurant/today"),
      onSuccess: async (storesRes) => {
        const storesData = storesRes
        await fetchFavorites(storesData)
      },
      onError: () => console.error("Erro ao atualizar dados:", error),
    })
  }

  return { stores, toggleFavorite, error }
}
