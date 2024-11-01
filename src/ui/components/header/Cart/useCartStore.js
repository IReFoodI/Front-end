import create from "zustand"

import { cartService } from "./cartService"

const useCartStore = create((set) => ({
  cartItems: [],
  subtotal: 0,

  fetchCart: async (userId) => {
    try {
      const cartItems = await cartService.fetchCart(userId)
      const subtotal = cartItems.reduce(
        (acc, item) => acc + item.unitValue * item.quantity,
        0
      )
      set({ cartItems, subtotal })
    } catch (error) {
      console.error("Failed to fetch cart items:", error)
    }
  },

  clearCart: async (cartId) => {
    try {
      await cartService.clearCart(cartId)
      set({ cartItems: [], subtotal: 0 })
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  },
}))

export default useCartStore
