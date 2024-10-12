import {
  IconCreditCard,
  IconHeart,
  IconKey,
  IconMap,
  IconMoneybag,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { TermsOfUse } from "@/domains/user/components/authentication/TermsOfUse"
import { ProfileImagePlaceholder } from "@/ui/assets/ProfileImgePlaceholder"

import { Button } from "../../ui/button/button"
import { SheetDescription, SheetHeader, SheetTitle } from "../../ui/sheet"
import { ContainerStatus } from "./ContainerStatus"
import { InformationButton } from "./InformationButton"

export function ProfileSheet() {
  const { value } = useMediaQuery("(max-width: 768px)")
  const [activeInformationButton, setActiveInformationButton] = useState(null)

  const informationButtons = [
    {
      iconForButton: <IconUser />,
      buttonText: "Meus Dados",
      path: "/",
    },
    {
      iconForButton: <IconHeart />,
      buttonText: "Favoritos",
      path: "/favoritos",
    },
    {
      iconForButton: <IconMap />,
      buttonText: "Endereços",
      path: "/address",
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

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-3">
        <div className="mt-4 flex justify-between gap-2">
          {value ? (
            <SheetHeader className="w-full">
              <div className="z-1 flex h-12 w-full items-center justify-start rounded-xl bg-gradient-to-r from-primary to-orange-400">
                <ProfileImagePlaceholder className="z-2 m-1 w-14" />
                <SheetTitle className="m-1 text-lg font-semibold leading-5 text-white">
                  Olá, Usuário.
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </div>
            </SheetHeader>
          ) : (
            <div className="z-1 flex h-12 w-full items-center justify-start rounded-xl bg-gradient-to-r from-primary to-orange-400">
              <ProfileImagePlaceholder className="z-2 m-1 w-14" />
              <h1 className="m-1 text-lg font-semibold leading-5 text-white">
                Olá, Usuário
              </h1>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          {/* A cor lilac não existe no tailwind */}
          <div className="w-full rounded-xl bg-gray-200 p-4 text-center">
            <h2 className="text-sm font-semibold leading-5">
              Você ainda não possuí pedidos em andamento
            </h2>
            <Link
              to="/"
              className="text-xs font-semibold text-orange-700 hover:text-orange-400"
            >
              Que tal fazer um agora?
            </Link>
          </div>

          <div className="m-2 flex w-full justify-between gap-2">
            <ContainerStatus
              containerIcon={
                <IconShoppingBag size={30} className="text-orange-700" />
              }
              content="1"
              title="pedidos feitos"
            />

            <ContainerStatus
              containerIcon={
                <IconMoneybag size={30} className="text-orange-700" />
              }
              content="R$ 10,00"
              title="economizados"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          {informationButtons.map((button, index) => (
            <InformationButton
              key={index}
              ownIndex={index}
              iconForButton={button.iconForButton}
              buttonText={button.buttonText}
              path={button.path}
              currentIndex={activeInformationButton}
              setCurrentIndex={setActiveInformationButton}
            />
          ))}
        </div>
      </div>

      <div className="mb-2 flex flex-col gap-4">
        <div className="jus flex flex-col gap-2">
          <TermsOfUse className={"text-start"}>Termos e condições</TermsOfUse>
          <Link to="/" className="text-sm font-semibold text-primary underline">
            Ajuda
          </Link>
        </div>
        <Button className="w-full rounded-3xl bg-primary text-base font-semibold">
          Sair
        </Button>
      </div>
    </div>
  )
}
