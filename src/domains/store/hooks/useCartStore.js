// cartStore.js
import { create } from "zustand"

// Criando a store com Zustand
export const useCartStore = create((set) => ({
  cart: [],

  // Função para adicionar produto ao carrinho
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id)

      if (existingProduct) {
        // Atualiza a quantidade se o produto já existe
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, amountAdded: item.amountAdded + product.amountAdded }
              : item
          ),
        }
      } else {
        // Adiciona o produto novo
        return { cart: [...state.cart, product] }
      }
    }),

  // Função para remover produto do carrinho
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  // Função para limpar o carrinho
  clearCart: () => set({ cart: [] }),
}))

export default useCartStore
