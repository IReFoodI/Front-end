import {
  IconCaretDownFilled,
  IconFilter,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"

import logo from "../../assets/Logo.svg"
import MenuMobile from "../navMenu/MenuMobile"
import { Input } from "../ui/input"
import { Popover, PopoverTrigger } from "../ui/popover"
import RestaurantFilter from "./components/RestaurantFilter"

function Header() {
  return (
    <header className="sticky top-0 w-screen bg-orange-50 p-4 drop-shadow-md">
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
                className="text-md rounded-lg px-2 py-1 hover:bg-orange-100 active:bg-orange-100 active:text-primary"
              >
                Início
              </Link>
              <Link
                to="/"
                className="text-md rounded-lg px-2 py-1 hover:bg-orange-100 active:bg-orange-100 active:text-primary"
              >
                Pedidos
              </Link>
            </div>
          </div>
          <div className="right-0 flex gap-4 md:absolute">
            {/* Aqui é onde será colocado o modal de perfil */}
            <div className="relative hidden w-9 cursor-pointer rounded-lg bg-orange-100 p-1 md:flex">
              <IconUser className="text-primary" size={28} />
            </div>
            <Link
              className="relative w-9 rounded-sm bg-orange-100 p-1 md:rounded-lg"
              to="/"
            >
              {/* colocar rota para página de pedidos na sacola de compras */}
              <span className="absolute left-0 top-0 mx-px inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary px-1 py-1 text-xs leading-none text-white">
                1
              </span>
              <IconShoppingBag className="text-primary" size={28} />
            </Link>
          </div>
        </section>
        {/* APLICAR CONDICIONAL PARA MOSTRAR A PARTE ABAIXO DO HEADER DEPENDENDO DA PÁGINA QUE O USUÁRIO ESTIVER. "APLICAR HIDDEN" */}
        <section className="flex w-full flex-col items-center justify-center md:flex-row">
          <div className="m-2 flex w-full items-center justify-center p-1 md:order-last md:mr-14">
            <p className="md:text-md text-sm font-semibold">
              Endereço da pessoa, XX
            </p>
            <span className="ml-2">
              <IconCaretDownFilled
                stroke={2}
                className="text-primary"
                size={20}
              />
            </span>
          </div>
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

            <Popover className="relative">
              <PopoverTrigger className="absolute right-0 mr-2 text-[#616375]"r>
                <IconFilter
                  size={20}
                />
              </PopoverTrigger>
              <RestaurantFilter />
            </Popover>
          </div>
        </section>
      </div>
    </header>
  )
}

export default Header
