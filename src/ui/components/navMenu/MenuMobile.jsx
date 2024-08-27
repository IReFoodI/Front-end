import {
  IconCaretRightFilled,
  IconCreditCard,
  IconCurrencyDollar,
  IconHeart,
  IconKey,
  IconMap,
  IconMenu2,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-9 rounded-sm bg-orange-100 p-1">
          <IconMenu2 className="m-auto text-[#FB3D01]" size={24} />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-[#F8F9FE]">
        <SheetHeader className="bg-[#F8F9FE]">
          <SheetTitle>
            <div className="flex w-[90%] items-start justify-start rounded-xl bg-primary">
              <div className="w-13 absolute top-5 ml-1 rounded-full bg-gray-200 p-3">
                <IconUser className="text-primary" size={26} />
              </div>
              <h2 className="text-md ml-7 w-full py-2 text-center text-white">
                Olá, Usuário
              </h2>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="w-[90%]">
          <h2>Você ainda não possuí pedidos em andamento</h2>
          <h3>Que tal fazer um agora?</h3>
        </div>
        <div className="w-[90%]">
          <div>
            <IconShoppingBag />
            <span>1</span>
            <p>pedidos feitos</p>
          </div>
          <div>
            <IconCurrencyDollar />
            <span>R$ 10,00</span>
            <p>economizados</p>
          </div>
        </div>
        <Link to="/" className="flex w-[90%]">
          <IconUser stroke={2} /> <span> Meus Dados</span>{" "}
          <IconCaretRightFilled />
        </Link>
        <Link to="/" className="flex w-[90%]">
          <IconHeart stroke={2} /> <span> Favoritos</span>{" "}
          <IconCaretRightFilled />
        </Link>
        <Link to="/" className="flex w-[90%]">
          <IconMap stroke={2} /> <span> Endereços</span>{" "}
          <IconCaretRightFilled />
        </Link>
        <Link to="/" className="flex w-[90%]">
          <IconCreditCard stroke={2} /> <span> Cartões</span>{" "}
          <IconCaretRightFilled />
        </Link>
        <Link to="/" className="flex w-[90%]">
          <IconKey stroke={2} /> <span> Alterar Senha</span>{" "}
          <IconCaretRightFilled />
        </Link>
        <div className="absolute bottom-3 flex w-[80%] flex-col">
          <Link to="/" className="block p-1 underline">
            Termos e Condições
          </Link>
          <Link to="/" className="mb-5 block p-1 underline">
            Ajuda
          </Link>
          <SheetFooter>
            <Button className="text-md rounded-full">Sair</Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuMobile
