import { DialogTitle } from "@radix-ui/react-dialog"
import { IconShoppingBag, IconUser } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import useCartStore from "../../../app/store/useCartStore"
import { userService } from "../../../domains/user/services/userService"
import useUserStore from "../../../domains/user/stores/useUserStore"
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
import { ProfileSheet } from "./profileSheet/ProfileSheet"
import { SearchInput } from "./search/searchInput"

export function Header() {
  const [isPopoverOpen, setIsPopoverOpen] = useState({
    profile: false,
    address: false,
    cart: false,
  })
  const { userId, setUserId } = useUserStore()
  const { fetchCart, clearLocalStorageCart } = useCartStore()
  const { pathname } = useLocation()

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
    clearLocalStorageCart()
    fetchCart(userId)
  }, [fetchCart, userId, clearLocalStorageCart, isPopoverOpen.cart])

  let cartItems = useCartStore((state) => state.cartItems)

  const orderQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  function onToggleModals(modal, open) {
    setIsPopoverOpen((prev) => ({ ...prev, [modal]: open }))
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
                className={`rounded-lg px-2 py-1 hover:bg-[#ffeae4] ${pathname === "/" ? "bg-[#ffeae4] text-primary" : ""}`}
              >
                Início
              </Link>
              <Link
                to="/pedidos"
                className={`rounded-lg px-2 py-1 hover:bg-[#ffeae4] ${pathname == "/pedidos" ? "bg-[#ffeae4] text-primary" : ""}`}
              >
                Pedidos
              </Link>
            </div>
          </div>
        </section>

        <section className="order-2 flex w-full flex-1 flex-col items-center justify-center md:flex-row">
          <SearchInput />
          <AddressModal
            open={isPopoverOpen.address}
            onOpenChange={(open) => onToggleModals("address", open)}
          />
        </section>

        <section className="order-1 flex w-full items-center justify-between gap-2 md:order-last md:w-fit">
          <MenuMobile />
          <Link className="w-24 md:mr-7 md:hidden" to="/">
            <img src={logo} alt="Logo" className="w-full" />
          </Link>
          <Popover
            open={isPopoverOpen.profile}
            onOpenChange={(open) => onToggleModals("profile", open)}
          >
            <PopoverTrigger asChild>
              <div
                className={`relative hidden w-9 cursor-pointer rounded-lg p-1 hover:bg-[#ffeae4] md:flex ${pathname == "/meus-dados" ? "bg-[#ffeae4] text-primary" : " "}`}
              >
                <IconUser className="w-full text-center" size={30} />
              </div>
            </PopoverTrigger>

            <PopoverContent
              sideOffset={20}
              className="max-h-max-profile-sheet overflow-auto md:w-80"
            >
              <ProfileSheet
                closeModal={() => onToggleModals("profile", false)}
              />
            </PopoverContent>
          </Popover>

          <Sheet
            open={isPopoverOpen.cart}
            onOpenChange={(e) => onToggleModals("cart", e)}
          >
            <SheetTrigger
              className={`relative rounded-sm p-1 hover:bg-[#ffeae4] md:rounded-lg ${pathname == "/finalizar-pedido" ? "bg-[#ffeae4] text-primary" : " "}`}
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
              <SheetDescription>
                Os itens do carrinho expiram em <b>10 minutos</b> se a compra
                não for finalizada.
              </SheetDescription>
              <Cart onToggleModals={onToggleModals} />
            </SheetContent>
          </Sheet>
        </section>
      </div>
    </header>
  )
}
