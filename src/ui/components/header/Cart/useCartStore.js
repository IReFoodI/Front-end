import { create } from "zustand"

import { cartService } from "./cartService"

const useCartStore = create((set) => ({
  cartItems: [],
  subtotal: 0,
  cartId: null,
  restaurantName: null,

  fetchCart: async (userId) => {
    try {
      const cartItems = await cartService.fetchCart(userId)
      const subtotal = cartItems.reduce(
        (acc, item) => acc + item.unitValue * item.quantity,
        0
      )

      let restaurantName = ""
      let cartId = null

      if (cartItems.length > 0) {
        const productId = cartItems[0].productId
        restaurantName =
          await cartService.fetchRestaurantNameByProductId(productId)
        cartId = cartItems[0].cartId // Defina o cartId baseado no primeiro item
      }

      set({ cartItems, subtotal, restaurantName, cartId })
    } catch (error) {
      console.error("Failed to fetch cart items:", error)
    }
  },

  clearCart: async () => {
    try {
      const { cartId } = useCartStore.getState() // Obtém o cartId do estado atual
      if (!cartId) {
        console.error("Cart ID is missing")
        return
      }
      await cartService.clearCart(cartId)
      set({ cartItems: [], subtotal: 0, cartId: null })
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  },

  removeItemFromCart: async (productId) => {
    const { cartId, cartItems } = useCartStore.getState()
    if (!cartId) {
      console.error("Cart ID is missing")
      return
    }
    try {
      await cartService.removeItemFromCart(cartId, productId)
      const updatedItems = cartItems.filter(
        (item) => item.productId !== productId
      )
      const newSubtotal = updatedItems.reduce(
        (acc, item) => acc + item.unitValue * item.quantity,
        0
      )
      set({ cartItems: updatedItems, subtotal: newSubtotal })
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
    }
  },
}))

export default useCartStore
