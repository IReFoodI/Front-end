import { create } from "zustand"

const userOpenBagStore = create((set) => ({
  openBagItems: [],
  totalAmount: 0,
  loading: false,

  setOpenBagItems: (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    set({ openBagItems: items, totalAmount: total })
  },

  clearOpenBag: () => set({ openBagItems: [], totalAmount: 0 }),

  setLoading: (loading) => set({ loading }),
}))

export { userOpenBagStore }
