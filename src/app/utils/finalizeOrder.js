import userOrderService from "@/app/service/userOrderService"
import restaurantStore from "@/app/store/restaurantStore"
import useCartStore from "@/app/store/useCartStore"
import userCardStore from "@/app/store/userCardStore"

import userStore from "../../domains/user/stores/userStore"

export const finalizeOrder = async ({ navigate }) => {
  const { selectedCard } = userCardStore.getState()
  const { cartItems, subtotal } = useCartStore.getState()
  const { restaurantInfo, restaurantAddress } = restaurantStore.getState()
  const { userId } = userStore.getState()

  if (!selectedCard) {
    alert("Selecione um cartão válido!")
    return
  }

  if (!restaurantAddress || restaurantAddress.length === 0) {
    alert("Endereço do restaurante não encontrado!")
    return
  }

  const orderDate = new Date()
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(orderDate.getDate() + 2)

  const orderData = {
    orderDate: orderDate.toISOString(),
    orderStatus: "PENDENTE",
    deliveryDate: deliveryDate.toISOString(),
    deliveryType: "RETIRADA",
    totalValue: subtotal,
    userId,
    restaurantId: restaurantInfo.restaurantId,
    addressId: restaurantAddress[0].addressId,
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
    const response = await userOrderService.createOrder(orderData)

    if (response.status === 201) {
      navigate("/pedidos")
    } else {
      throw new Error("Erro ao criar o pedido!")
    }
  } catch (error) {
    console.error("Falha ao finalizar o pedido:", error)
    alert("Falha ao finalizar o pedido. Tente novamente.")
  }
}
