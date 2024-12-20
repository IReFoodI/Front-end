import {
  IconCreditCard,
  IconHeart,
  IconKey,
  IconMap,
  IconMoneybag,
  IconPaperBag,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"

import { TermsOfUse } from "@/domains/user/components/authentication/TermsOfUse"
import useUserStore from "@/domains/user/stores/useUserStore"
import { ProfileImagePlaceholder } from "@/ui/assets/ProfileImgePlaceholder"

import { Button } from "../../ui/button/button"
import { ContainerStatus } from "./ContainerStatus"
import { InformationButton } from "./InformationButton"

export function ProfileSheet({ closeModal }) {
  const { user } = useUserStore()
  const { logout } = useUserStore()
  const navigate = useNavigate()
  const pathname = location?.pathname

  const informationButtons = [
    {
      iconForButton: <IconUser />,
      buttonText: "Meus Dados",
      path: "/meus-dados",
    },
    {
      iconForButton: <IconHeart />,
      buttonText: "Favoritos",
      path: "/favoritos",
    },
    {
      iconForButton: <IconPaperBag />,
      buttonText: "Pedidos",
      path: "/pedidos",
    },
    {
      iconForButton: <IconMap />,
      buttonText: "Endereços",
      path: "/endereco",
    },
    {
      iconForButton: <IconCreditCard />,
      buttonText: "Cartões",
      path: "/cartoes",
    },
    {
      iconForButton: <IconKey />,
      buttonText: "Alterar Senha",
      path: "/alterar-senha",
    },
  ]

  const handleLinkClick = (path) => {
    closeModal()
    navigate(path)
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <nav className="flex flex-col gap-3">
        <div className="flex justify-between gap-2">
          <div className="z-1 flex w-full items-center justify-start rounded-xl bg-gradient-to-r from-primary to-orange-400 md:max-h-20">
            <ProfileImagePlaceholder className="z-2 m-1 w-14" />
            <h1 className="m-1 text-lg font-semibold leading-5 text-white">
              Olá, {user?.name}!
            </h1>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full rounded-xl bg-gray-200 p-4 text-center">
            {/* <h2 className="text-sm font-semibold leading-5">
              Você ainda não possuí pedidos em andamento
            </h2> */}
            <Link
              to="/"
              className="text-base font-semibold text-primary hover:text-orange-400"
            >
              Que tal fazer um pedido?
            </Link>
          </div>
          {/* 
          <div className="m-2 flex w-full justify-between gap-2">
            <ContainerStatus
              containerIcon={
                <IconShoppingBag size={26} className="text-primary" />
              }
              content="1"
              title="pedidos feitos"
              linkTo={"/pedidos"}
            />

            <ContainerStatus
              containerIcon={
                <IconMoneybag size={26} className="text-primary" />
              }
              content="R$ 10,00"
              title="economizados"
            />
          </div> */}
        </div>

        <ul className="flex w-full flex-col gap-2">
          {informationButtons.map((button, index) => (
            <InformationButton
              key={index}
              ownIndex={button.path}
              iconForButton={button.iconForButton}
              buttonText={button.buttonText}
              currentIndex={pathname}
              setCurrentIndex={() => handleLinkClick(button.path)}
            />
          ))}
        </ul>
      </nav>

      <div className="mb-2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <TermsOfUse
            className={
              "w-fit border-none text-start text-sm outline-none focus:border-none focus:outline-none"
            }
          >
            Termos e condições
          </TermsOfUse>
        </div>
        <Button
          onClick={logout}
          className="w-full rounded-3xl bg-primary text-base font-semibold"
        >
          Sair
        </Button>
      </div>
    </div>
  )
}
