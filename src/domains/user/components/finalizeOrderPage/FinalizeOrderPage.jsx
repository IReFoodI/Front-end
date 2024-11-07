import { useNavigate } from "react-router-dom"

import restaurantStore from "@/app/store/restaurantStore"
import useCartStore from "@/app/store/useCartStore"
import userCardStore from "@/app/store/userCardStore"
import { Button } from "@/ui/components/ui/button/button"

import userStore from "../../../user/stores/userStore"
import { OrderDetails } from "./OrderDetails"
import Orderitems from "./Orderitems"

export function FinalizeOrderPage() {
  const { cards, selectedCard } = userCardStore()
  const { cartItems, subtotal } = useCartStore()
  const { restaurantInfo, restaurantAddress } = restaurantStore()
  const { userId } = userStore()

  const navigate = useNavigate()

  const handleFinalizeOrder = async () => {
    // console.log(restaurantAddress)
    // console.log(restaurantInfo)
    // console.log(restaurantAddress[0].addressId)
    // Verifica se um cartão foi selecionado e se está válido
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
      orderDate: new Date().toISOString(),
      orderStatus: "PENDENTE",
      deliveryDate: deliveryDate.toISOString(),
      deliveryType: "RETIRADA",
      totalValue: subtotal,
      userId: userId,
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

    console.log(orderData)

    try {
      // TESTANDOOOO
      const response = await fetch("http://localhost:8080/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      console.log(response)

      if (!response.status == 201) {
        throw new Error("Erro ao criar o pedido!")
      }
      if (response.status == 201) {
        navigate("/pedidos")
      }
    } catch (error) {
      console.log("Falha ao finalizar o pedido. Tente novamente.")
      console.error(error)
    }
  }

  return (
    <div
      id="page"
      className="mx-auto flex h-full w-full max-w-[1216px] flex-col justify-center text-gray-600 antialiased"
    >
      <h1 className="mb-5 w-full pb-6 text-center text-2xl font-semibold">
        Finalize seu pedido
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          Seu carrinho está vazio.
        </div>
      ) : (
        <div className="mx-auto flex w-full flex-col lg:flex-row">
          <div className="mb-11 min-w-[50%] lg:mb-0">
            {/* LEFT - ORDER DETAILS */}
            <OrderDetails />
          </div>
          {/* RIGHT - ITEMS */}
          <div className="min-w-[45%]">
            <Orderitems />
          </div>

          {cards.length > 0 ? (
            <div className="mx-auto my-11 w-full max-w-[400px] px-5 lg:hidden">
              <Button
                className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl"
                onClick={handleFinalizeOrder}
                disabled={!selectedCard || !cartItems.length}
              >
                Finalizar
              </Button>
            </div>
          ) : (
            <div className="mx-auto my-11 w-full max-w-[400px] px-5 lg:hidden">
              <Button
                className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl"
                disabled
              >
                Finalizar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
