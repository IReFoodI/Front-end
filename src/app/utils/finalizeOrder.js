import userOrderService from "@/app/service/userOrderService"
import useCartStore from "@/app/store/useCartStore"
import userCardStore from "@/app/store/userCardStore"

import useUserStore from "../../domains/user/stores/useUserStore"

export const finalizeOrder = async ({ navigate, cartItemsWithRestaurant }) => {
  const { selectedCard } = userCardStore.getState()
  const { cartItems, subtotal } = useCartStore.getState()
  // const { restaurantInfo, restaurantAddress } = restaurantStore.getState()
  const { userId } = useUserStore.getState()

  if (!selectedCard) {
    alert("Selecione um cartão válido!")
    return
  }

  if (!cartItemsWithRestaurant?.restaurant) {
    alert("Ocorreu um erro ao identidicar o restaurante!")
    return
  }

  const orderDate = new Date()
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(orderDate.getDate() + 2)

  const orderData = {
    orderDate: orderDate.toISOString(),
    deliveryDate: deliveryDate.toISOString(),
    orderStatus: "PENDENTE",
    deliveryType: "RETIRADA",
    totalValue: subtotal,
    userId,
    restaurantId: cartItemsWithRestaurant?.restaurant?.restaurantId,
    addressId: cartItemsWithRestaurant?.restaurant?.address?.addressId,
    reviewId: null,
    transactionId: null,
    orderItems: cartItems.map((item) => ({
      quantity: item.quantity,
      unitValue: item.unitValue,
      subtotal: item.subtotal,
      productId: item.productId,
    })),
  }

  try {
    const orderResponse = await userOrderService.createOrder(orderData)

    if (orderResponse.status === 201) {
      const orderId = orderResponse.data.orderId

      const transactionData = {
        transactionDate: new Date().toISOString(),
        transactionValue: subtotal,
        transactionStatus: "APROVADA",
        cardId: selectedCard,
        orderId: orderId,
      }

      const transactionResponse =
        await userOrderService.createTransaction(transactionData)
      if (transactionResponse.status === 201) {
        await useCartStore.getState().clearCart()
        navigate("/pedidos")
      } else {
        throw new Error("Erro ao criar a transação!")
      }
    } else {
      throw new Error("Erro ao criar o pedido!")
    }
  } catch (error) {
    console.error("Falha ao finalizar o pedido:", error)
    alert("Falha ao finalizar o pedido. Tente novamente.")
  }
}
