import { IconShoppingBag } from "@tabler/icons-react"
import { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import useCartStore from "@/app/store/useCartStore"
import userCardStore from "@/app/store/userCardStore"
import useUserStore from "@/domains/user/stores/useUserStore"
import { NotFound } from "@/ui/components/NotFound"
import { Button } from "@/ui/components/ui/button/button"

import { finalizeOrder } from "../../../../app/utils/finalizeOrder"
import { OrderDetails } from "./OrderDetails"
import Orderitems from "./Orderitems"

export function FinalizeOrderPage() {
  const { selectedCard } = userCardStore()
  const { user } = useUserStore()
  const { cartItemsWithRestaurant, getCartWithRestaurantByUserId, cartItems } =
    useCartStore()

  const [isLoading, setIsLoading] = useState(true) // Estado de carregamento

  useLayoutEffect(() => {
    // Chama a função para buscar o carrinho com restaurante
    const fetchCartData = async () => {
      await getCartWithRestaurantByUserId(user?.userId)
      setIsLoading(false) // Após o carregamento, seta isLoading como false
    }

    if (user?.userId) {
      fetchCartData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, cartItems])

  const navigate = useNavigate()

  // Se ainda estiver carregando, mostre um loading
  if (isLoading || !cartItemsWithRestaurant) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>Carregando...</div>
      </div>
    )
  }

  if (!cartItemsWithRestaurant) {
    return (
      <NotFound
        Icon={IconShoppingBag}
        title={"Erro ao carregar o carrinho."}
        description={"Tente recarregar a página ou volte mais tarde."}
        linkTo={"/produtos/pesquisar"}
        textButton={"Explorar agora!"}
      />
    )
  }

  const handleFinalizeOrder = () => {
    if (!cartItemsWithRestaurant?.restaurant) {
      console.error("Os dados do restaurante não foram carregados.")
      return
    }
    finalizeOrder({ navigate, cartItemsWithRestaurant })
  }

  return (
    <div
      id="page"
      className="mx-auto flex h-full w-full max-w-[1216px] flex-col justify-center text-gray-600 antialiased"
    >
      <h1 className="mb-5 w-full pb-6 text-center text-2xl font-semibold">
        Finalize seu pedido
      </h1>
      {cartItemsWithRestaurant?.items.length === 0 ? (
        <NotFound
          Icon={IconShoppingBag}
          title={"Seu carrinho está vazio."}
          description={"Adicione produtos ao seu carrinho"}
          linkTo={"/produtos/pesquisar"}
          textButton={"Explorar agora!"}
        />
      ) : (
        <div className="mx-auto flex w-full flex-col lg:flex-row">
          <div className="mb-11 min-w-[50%] lg:mb-0">
            {/* LEFT - ORDER DETAILS */}
            <OrderDetails
              cartItemsWithRestaurant={cartItemsWithRestaurant}
              handleFinalizeOrder={handleFinalizeOrder}
            />
          </div>
          {/* RIGHT - ITEMS */}
          <div className="min-w-[45%]">
            <Orderitems cartItemsWithRestaurant={cartItemsWithRestaurant} />
          </div>
          {/* BUTTON FINALIZAR */}
          <div className="mx-auto my-11 w-full max-w-[400px] px-5 lg:hidden">
            <Button
              className="w-full rounded-full border-gray-400 lg:p-5 lg:text-xl"
              onClick={handleFinalizeOrder}
              disabled={
                !selectedCard || cartItemsWithRestaurant?.items.length === 0
              }
            >
              Finalizar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
