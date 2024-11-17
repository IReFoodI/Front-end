import { create } from "zustand"

import orderService from "../service/userOrderService"

const useOrderStore = create((set) => ({
  orderHistory: [],
  orderOnGoing: [],
  isLoading: false,
  error: null,

  fetchOrders: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      const allOrders = await orderService.fetchOrders(userId)

      const orderHistory = allOrders.filter((order) =>
        ["CONCLUIDO", "CANCELADO"].includes(order.orderStatus)
      )
      const orderOnGoing = allOrders.filter((order) =>
        ["PENDENTE", "PREPARANDO", "AGUARDANDO_RETIRADA"].includes(
          order.orderStatus
        )
      )

      // Carrega dados dos restaurantes para cada pedido
      const ordersWithDetails = await Promise.all(
        [...orderHistory, ...orderOnGoing].map(async (order) => {
          const restaurant = await orderService.fetchRestaurantDetails(
            order.restaurantId
          )
          return {
            ...order,
            restaurantName: restaurant.fantasy,
            restaurantCategory: restaurant.category,
            restaurantLogo: restaurant.urlLogo,
          }
        })
      )

      // Atualiza o estado com os pedidos com detalhes
      set({
        orderHistory: ordersWithDetails.filter((order) =>
          ["CONCLUIDO", "CANCELADO"].includes(order.orderStatus)
        ),
        orderOnGoing: ordersWithDetails.filter((order) =>
          ["PENDENTE", "PREPARANDO", "AGUARDANDO_RETIRADA"].includes(
            order.orderStatus
          )
        ),
      })
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error)
      set({ error: "Não foi possível carregar os pedidos. " + error })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useOrderStore
