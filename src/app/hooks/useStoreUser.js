import { create } from "zustand"

export const useStoreUser = create((set) => ({
  user: {},
  addUser: (data) => set({ user: data }),
  removeUser: () => set({ user: {} }),
}))
