import {
  IconCreditCard,
  IconHeart,
  IconKey,
  IconMap,
  IconMenu2,
  IconMoneybag,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { ProfileImagePlaceholder } from "@/ui/assets/ProfileImgePlaceholder"

import { SheetClose } from "../../ui/sheet"
import { ContainerStatus } from "./ContainerStatus"
import { InformationButton } from "./InformationButton"

export function ProfileSheet() {
  return (
    <div className="flex flex-col gap-3">
      <div className="mt-4 flex justify-between gap-2">
        <div className="z-1 flex h-12 w-full items-center justify-start rounded-xl bg-gradient-to-r from-orange-600 to-orange-400">
          <ProfileImagePlaceholder className="z-2 m-1 w-14" />
          <h1 className="m-1 text-lg font-semibold leading-5 text-white">
            Olá, Usuário
          </h1>
        </div>

        <SheetClose className="cursor-pointer rounded-sm bg-orange-100 p-1 md:hidden">
          <IconMenu2 className="m-auto text-orange-600" size={30} />
        </SheetClose>
      </div>

      <div className="flex w-full flex-col items-center justify-center">
        {/* A cor lilac não existe no tailwind */}
        <div className="w-full rounded-xl bg-gray-200 p-4 text-center">
          <h2 className="text-sm font-semibold leading-5">
            Você ainda não possuí pedidos em andamento
          </h2>
          <Link to="/" className="text-xs font-semibold text-orange-600">
            Que tal fazer um agora?
          </Link>
        </div>

        <div className="m-2 flex w-full justify-between gap-2">
          <ContainerStatus
            containerIcon={
              <IconShoppingBag size={30} className="text-orange-600" />
            }
            content="1"
            title="pedidos feitos"
          />

          <ContainerStatus
            containerIcon={
              <IconMoneybag size={30} className="text-orange-600" />
            }
            content="R$ 10,00"
            title="economizados"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <InformationButton
          iconForButton={<IconUser />}
          buttonText="Meus Dados"
          path="/meusdados"
        />

        <InformationButton
          iconForButton={<IconHeart />}
          buttonText="Favoritos"
          path="/"
        />

        <InformationButton
          iconForButton={<IconMap />}
          buttonText="Endereços"
          path="/"
        />

        <InformationButton
          iconForButton={<IconCreditCard />}
          buttonText="Cartões"
          path="/"
        />

        <InformationButton
          iconForButton={<IconKey />}
          buttonText="Alterar Senha"
          path="/"
        />
      </div>
    </div>
  )
}
