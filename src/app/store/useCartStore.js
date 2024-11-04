import { create } from "zustand"

import { cartService } from "../service/cartService"

const useCartStore = create((set) => ({
  cartItems: [],
  subtotal: 0,
  cartId: null,
  restaurantName: null,

  fetchCart: async (userId) => {
    if (!userId) {
      return
    }
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
        cartId = cartItems[0].cartId
      }

      set({ cartItems, subtotal, restaurantName, cartId })
    } catch (error) {
      console.log("Failed to fetch cart items:", error)
    }
  },

  clearCart: async () => {
    try {
      const { cartId } = useCartStore.getState()
      if (!cartId) {
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

      const updatedItems = cartItems
        .map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
        .filter((item) => item.quantity > 0)

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
