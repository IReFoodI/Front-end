import { create } from "zustand"

const cardStore = create()((set) => ({
  cardData: [],
  isCardLoading: true,

  setCardData: (data) => {
    set(() => ({
      cardData: data,
    }))
  },
  addCard: (data) => {
    set((prev) => ({
      cardData: [...prev.cardData, data],
    }))
  },
  updateCard: (data) => {
    set((prev) => ({
      cardData: prev.cardData.map((cardMap) => {
        if (cardMap.cardId !== data.cardId) {
          return cardMap
        }
        return data
      }),
    }))
  },
  deleteCard: (id) => {
    set((prev) => ({
      cardData: prev.cardData.filter((cardFilter) => cardFilter.cardId !== id),
    }))
  },
  loadedCards: () => {
    set(() => ({
      isCardLoading: false,
    }))
  },
}))

export default cardStore
