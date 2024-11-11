import { useCallback, useEffect, useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { storesCardsServices } from "@/domains/user/services/storesServices"

export function useFavorites() {
  const [stores, setStores] = useState([])
  const { onRequest, error } = useFetch()
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

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

          setStores((prevStores) => {
            const prevStoreIds = new Set(
              prevStores.map((store) => store.restaurant.restaurantId)
            )
            const mergedStores = [
              ...prevStores,
              ...updatedStores.filter(
                (store) => !prevStoreIds.has(store.restaurant.restaurantId)
              ),
            ]
            return mergedStores.map((store) => {
              const favorite = favRes.find(
                (fav) => fav.restaurantId === store.restaurant.restaurantId
              )
              return {
                ...store,
                isFavorited: !!favorite,
                favoriteId: favorite ? favorite.favoriteId : null,
              }
            })
          })
        },
        onError: () =>
          console.error("Erro ao buscar dados dos favoritos:", error),
      })
    },
    [onRequest, error]
  )

  const fetchStores = useCallback(
    async (pageNumber) => {
      setLoading(true)
      await onRequest({
        request: async () => storesCardsServices.getStores(pageNumber),
        onSuccess: async (storesRes) => {
          setTotalPages(storesRes.page.totalPages)
          const storesData = storesRes._embedded?.hashMapList
          if (storesData) {
            setStores((prevStores) => {
              const existingIds = new Set(
                prevStores.map((store) => store.restaurant.restaurantId)
              )

              const newStores = storesData.filter(
                (store) => !existingIds.has(store.restaurant.restaurantId)
              )

              return [...prevStores, ...newStores]
            })

            await fetchFavorites(storesData)
          } else {
            console.error("No data found in the response")
          }
        },
        onError: (error) => console.error("Erro ao buscar dados:", error),
      })
      setLoading(false)
    },
    [onRequest, fetchFavorites]
  )

  useEffect(() => {
    fetchStores(page)
  }, [page, fetchStores])

  const loadMoreStores = () => {
    if (!loading && page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const addFavorite = async (restaurantId) => {
    await onRequest({
      request: async () => storesCardsServices.addFavorite(restaurantId),
      onSuccess: async () => {
        favoriteRefresh()
      },
      onError: () => console.error("Erro ao atualizar favorito:", error),
    })
  }

  const deleteFavorite = async (favoriteId) => {
    await onRequest({
      request: async () => storesCardsServices.deleteFavorite(favoriteId),
      onSuccess: async () => {
        favoriteRefresh()
      },
      onError: () => console.error("Erro ao atualizar favorito:", error),
    })
  }

  const toggleFavorite = (restaurantId, favoriteId) => {
    const updatedStores = stores.map((store) =>
      store.restaurant.restaurantId === restaurantId
        ? { ...store, isFavorited: !store.isFavorited }
        : store
    )
    setStores(updatedStores)
    localStorage.setItem("storesData", JSON.stringify(updatedStores))

    if (favoriteId) {
      deleteFavorite(favoriteId)
    } else {
      addFavorite(restaurantId)
    }
  }

  const favoriteRefresh = async () => {
    await onRequest({
      request: async (pageNumber) => storesCardsServices.getStores(pageNumber),
      onSuccess: async (storesRes) => {
        const storesData = storesRes._embedded.hashMapList
        await fetchFavorites(storesData)
      },
      onError: () => console.error("Erro ao atualizar dados:", error),
    })
  }

  return { stores, toggleFavorite, error, loadMoreStores, loading }
}
