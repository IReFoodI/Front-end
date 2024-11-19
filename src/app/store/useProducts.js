import { create } from "zustand"

import { restaurantServiceMarina } from "../service/restaurantServiceMarina"

export const useProductsStore = create((set, get) => ({
  products: [],
  storeId: 0,
  currentPage: 0,
  filter: "expiry_asc",

  fetchProducts: async () => {
    const { storeId, filter, currentPage } = get()

    if (!storeId) {
      console.error("storeId não definido.")
      return
    }

    try {
      const result =
        await restaurantServiceMarina.fetchRestaurantProductsByRestaurantId(
          storeId,
          filter,
          currentPage
        )

      set({ products: result.data })
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    }
  },

  setStoreId: (id) => {
    set({ storeId: id })
  },

  setFilter: (filter) => {
    set({ filter: filter })
  },

  setCurrentPage: (currentPage) => {
    set({ currentPage })
  },
}))
