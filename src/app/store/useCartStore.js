import { create } from "zustand"

import { cartService } from "../service/cartService"

const useCartStore = create((set) => ({
  cartItems: [],
  subtotal: 0,
  cartId: null,
  restaurantInfo: null,

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

      let restaurantInfo = ""
      let cartId = null

      if (cartItems.length > 0) {
        const productId = cartItems[0].productId
        restaurantInfo =
          await cartService.fetchRestaurantNameByProductId(productId)
        cartId = cartItems[0].cartId
      }

      set({ cartItems, subtotal, restaurantInfo, cartId })
    } catch (error) {
      if (error.status === 404) {
        console.log("Carrinho vazio")
      } else {
        console.log(error.message)
      }
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

  clearLocalStorageCart: () => {
    set({ cartItems: [], subtotal: 0, cartId: null })
  },

  removeItemFromCart: async (productId) => {
    const { cartId, cartItems } = useCartStore.getState()
    if (!cartId) {
      console.error("Cart ID is missing")
      return
    }

    try {
      await cartService.removeAllItemFromCart(cartId, productId)

      const updatedItems = cartItems.filter(
        (item) => item.productId != productId
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
