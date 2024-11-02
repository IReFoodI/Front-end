import { create } from "zustand"

import cardService from "@/app/service/cardService"

const userCardStore = create((set) => ({
  cards: [],
  isLoading: false,
  error: null,

  fetchCards: async () => {
    set({ isLoading: true, error: null })
    try {
      const cards = await cardService.fetchUserCards()
      set({ cards })
    } catch (error) {
      set({ error: "Não foi possível carregar os cartões." + error })
    } finally {
      set({ isLoading: false })
    }
  },

  removeCard: async (cardId) => {
    set({ isLoading: true, error: null })
    try {
      await cardService.deleteCard(cardId)
      set((state) => ({
        cards: state.cards.filter((card) => card.cardId !== cardId),
      }))
    } catch (error) {
      set({ error: "Não foi possível deletar o cartão." + error })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default userCardStore
