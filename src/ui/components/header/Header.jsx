import { DialogTitle } from "@radix-ui/react-dialog"
import {
  IconFilter,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import useCartStore from "../../../app/store/useCartStore"
import { userService } from "../../../domains/user/services/userService"
import userStore from "../../../domains/user/stores/userStore"
import logo from "../../assets/Logo.svg"
import { AddressModal } from "../header/addressModal/AddressModal"
import { MenuMobile } from "../header/navMenu/MenuMobile"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet"
import { Cart } from "./Cart/Cart"
// import { OrderReview } from "./orderReview/OrderReview"
import { ProfileSheet } from "./profileSheet/ProfileSheet"
import { SearchInput } from "./search/searchInput"

export function Header() {
  const [isActive, setIsActive] = useState(false)
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false)
  const { userId, setUserId } = userStore()
  const { fetchCart, clearCart } = useCartStore()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUser()
        setUserId(response.data.id)
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error)
      }
    }

    fetchUser()
  }, [setUserId])

  useEffect(() => {
    clearCart()
    fetchCart(userId)
  }, [fetchCart, userId, clearCart])

  let cartItems = useCartStore((state) => state.cartItems)

  const orderQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  function handleClick(open) {
    setIsActive(open)
  }

  function handleProfilePopoverOpen(open) {
    setIsProfilePopoverOpen(open)
  }

  return (
    <header className="sticky top-0 z-10 bg-[#fff7f5] p-4 text-gray-700 drop-shadow-md">
      <div className="relative flex max-w-screen-2xl flex-col items-center justify-between gap-2 md:m-auto md:w-[85%] md:flex-row lg:w-[70%]">
        <section className="hidden w-full items-center justify-between md:order-1 md:flex md:w-fit">
          <div className="flex items-center justify-start">
            <Link className="w-24 md:mr-7" to="/">
              <img src={logo} alt="Logo" className="w-full" />
            </Link>
            <div className="hidden items-center gap-5 md:flex">
              <Link
                to="/"
                className={`rounded-lg px-2 py-1 hover:bg-[#ffeae4] ${isActive ? "focus:bg-[#ffeae4] focus:text-primary" : ""}`}
                onClick={handleClick}
              >
                Início
              </Link>
              <Link
                to="/pedidos"
                className={`rounded-lg px-2 py-1 hover:bg-[#ffeae4] ${isActive ? "focus:bg-[#ffeae4] focus:text-primary" : ""}`}
                onClick={handleClick}
              >
                Pedidos
              </Link>
            </div>
          </div>
        </section>
        {/* APLICAR CONDICIONAL PARA MOSTRAR A PARTE ABAIXO DO HEADER DEPENDENDO DA PÁGINA QUE O USUÁRIO ESTIVER. "APLICAR HIDDEN" */}
        <section className="order-2 flex w-full flex-1 flex-col items-center justify-center md:flex-row">
          <SearchInput />
          <AddressModal />
        </section>
        <section className="order-1 flex w-full items-center justify-between gap-2 md:order-last md:w-fit">
          <MenuMobile />
          <Link className="w-24 md:mr-7 md:hidden" to="/">
            <img src={logo} alt="Logo" className="w-full" />
          </Link>
          <Popover onOpenChange={handleProfilePopoverOpen}>
            <PopoverTrigger asChild>
              <div
                className={`relative hidden w-9 cursor-pointer rounded-lg p-1 hover:bg-[#ffeae4] md:flex ${isProfilePopoverOpen ? "bg-[#ffeae4] text-primary" : " "}`}
              >
                <IconUser className="w-full text-center" size={30} />
              </div>
            </PopoverTrigger>

            <PopoverContent sideOffset={20}>
              <ProfileSheet />
            </PopoverContent>
          </Popover>

          <Sheet>
            <SheetTrigger
              className={`relative rounded-sm p-1 hover:bg-[#ffeae4] md:rounded-lg ${isActive ? "focus:bg-[#ffeae4] focus:text-primary" : " "}`}
            >
              <span className="absolute -right-1 -top-1 mx-px inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs leading-none text-white md:-right-2 md:-top-1 md:p-3 md:text-sm">
                {orderQuantity > 9 ? "9+" : orderQuantity}
              </span>
              <IconShoppingBag className="w-full text-center" size={30} />
            </SheetTrigger>
            <SheetContent className="max-h-screen overflow-auto">
              <DialogTitle className="text-lg font-semibold">
                Carrinho
              </DialogTitle>
              <SheetDescription />
              <Cart />
            </SheetContent>
          </Sheet>
        </section>
      </div>
    </header>
  )
}
