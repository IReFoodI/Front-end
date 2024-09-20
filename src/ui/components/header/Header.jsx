import {
  IconFilter,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import logo from "../../assets/Logo.svg"
import AddressModal from "../header/addressModal/AddressModal"
import MenuMobile from "../header/navMenu/MenuMobile"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ProfileSheet } from "./profileSheet/ProfileSheet"
import { RestaurantFilter } from "./restaurantFilter/RestaurantFilter"

function Header() {
  const [isActive, setIsActive] = useState(false)
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false)
  const [orderQuantity, setOrderQuantity] = useState(0)

  if (orderQuantity > 9) {
    setOrderQuantity(9 + "+")
  }

  function handleClick() {
    setIsActive(true)
  }

  function handleProfilePopoverOpen(open) {
    setIsProfilePopoverOpen(open)
  }

  return (
    <header className="sticky top-0 z-10 w-screen bg-orange-50 p-4 drop-shadow-md">
      <div className="relative flex w-full flex-col items-center justify-between md:m-auto md:w-[70%] md:flex-row">
        <section className="flex w-full items-center justify-between">
          <MenuMobile />
          <div className="flex items-center justify-start">
            <Link className="w-24 md:mr-7" to="/">
              <img src={logo} alt="Logo" className="w-full" />
            </Link>
            <div className="hidden items-center gap-5 md:flex">
              <Link
                to="/"
                className={`text-md rounded-lg px-2 py-1 hover:bg-orange-100 ${isActive ? "focus:bg-orange-100 focus:text-primary" : ""}`}
                onClick={handleClick}
              >
                Início
              </Link>
              <Link
                to="/"
                className={`text-md rounded-lg px-2 py-1 hover:bg-orange-100 ${isActive ? "focus:bg-orange-100 focus:text-primary" : ""}`}
                onClick={handleClick}
              >
                Pedidos
              </Link>
            </div>
          </div>
          <div className="right-0 flex gap-3 md:absolute">
            {/* Aqui é onde será colocado o modal de perfil */}

            <Popover onOpenChange={handleProfilePopoverOpen}>
              <PopoverTrigger asChild>
                <Link
                  className={`relative hidden w-9 cursor-pointer rounded-lg p-1 hover:bg-orange-100 md:flex ${isProfilePopoverOpen ? "bg-orange-100 text-primary" : " "}`}
                >
                  <IconUser className="w-full text-center" size={30} />
                </Link>
              </PopoverTrigger>

              <PopoverContent sideOffset={20}>
                <ProfileSheet />
              </PopoverContent>
            </Popover>
            <Link
              to="/"
              className={`relative m-auto w-10 rounded-sm p-1 hover:bg-orange-100 md:rounded-lg ${isActive ? "focus:bg-orange-100 focus:text-primary" : " "}`}
              onClick={handleClick}
            >
              {/* colocar rota para página de pedidos na sacola de compras */}
              <span className="absolute -right-1 -top-1 mx-px inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary p-2 text-xs leading-none text-white md:-right-2 md:-top-1 md:p-3 md:text-sm">
                {orderQuantity}
              </span>
              <IconShoppingBag className="w-full text-center" size={30} />
            </Link>
          </div>
        </section>
        {/* APLICAR CONDICIONAL PARA MOSTRAR A PARTE ABAIXO DO HEADER DEPENDENDO DA PÁGINA QUE O USUÁRIO ESTIVER. "APLICAR HIDDEN" */}
        <section className="flex w-full flex-col items-center justify-center md:flex-row">
          <AddressModal />
          <div className="relative m-auto flex w-full items-center justify-center md:right-40">
            <IconSearch
              className="absolute left-0 ml-2 text-primary"
              size={20}
            />
            <Input
              type="text"
              placeholder="Busque por estabelecimentos"
              className="bg-background pl-8"
            />

            <Popover className="relative" placement="center">
              <PopoverTrigger className="absolute right-0 mr-2 text-[#616375]">
                <IconFilter size={20} />
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={20} className="w-full">
                <RestaurantFilter />
              </PopoverContent>
            </Popover>
          </div>
        </section>
      </div>
    </header>
  )
}

export default Header
