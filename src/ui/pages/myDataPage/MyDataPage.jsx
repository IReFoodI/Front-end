import {
  IconCaretRightFilled,
  IconMoneybag,
  IconShoppingBag,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { ProfileImagePlaceholder } from "@/ui/assets/ProfileImgePlaceholder"
import { ContainerStatus } from "@/ui/components/header/profileSheet/ContainerStatus"
import { BasicUserInfo } from "@/ui/components/myDataPage/BasicUserInfo"
import { DefaultAddress } from "@/ui/components/myDataPage/DefaultAddress"
import { DeleteAccountModal } from "@/ui/components/myDataPage/DeleteAccountModal"
import { Button } from "@/ui/components/ui/button/button"

import image from "../../assets/ilustra.png"

export function MydataPage() {
  return (
    <div className="m-auto mt-20 flex h-screen w-screen max-w-[1216px] justify-center gap-5 text-gray-600 antialiased lg:h-auto">
      <section className="flex w-[90%] flex-col gap-4 lg:mt-10 lg:w-[50%]">
        <div className="flex h-24 w-full flex-col items-center justify-start rounded-xl bg-gradient-to-r from-[#FB3D01] to-[#F37C2A]">
          <ProfileImagePlaceholder className="relative bottom-10 z-0 w-20 rounded-full border-4 border-white" />
          <h1 className="relative bottom-5 z-0 text-2xl font-semibold leading-4 text-white">
            Olá, Usuário
          </h1>
        </div>
        <div className="mt-2 flex gap-5">
          <ContainerStatus
            containerIcon={
              <IconShoppingBag size={30} className="text-[#FB3D01]" />
            }
            content="1"
            title="pedidos feitos"
          />
          <ContainerStatus
            containerIcon={
              <IconMoneybag size={30} className="text-[#FB3D01]" />
            }
            content="R$ 10,00"
            title="economizados"
          />
        </div>
        <div className="mt-2 hidden w-full rounded-md bg-gray-50 lg:block">
          <DefaultAddress />
        </div>
        <div>
          <BasicUserInfo label="Nome" data="Nome do usuário" />
          <div className="lg:flex lg:gap-2">
            <BasicUserInfo label="Celular" data="(xx) xxxxx-xxxx" />
            <BasicUserInfo label="E-mail" data="e-mail@email.com" />
          </div>
          {/* Esse link leva para a rota de alterar os dados do usuário. */}
          <Link to="/" className="mt-7 flex items-center lg:hidden">
            <span className="mr-2">Alterar dados</span>
            <IconCaretRightFilled size={15} />
          </Link>
        </div>
        <div className="flex items-start justify-center gap-2">
          <DeleteAccountModal />
          <Button className="my-5 hidden w-[50%] rounded-full bg-primary p-5 text-lg lg:flex">
            <Link to="/">Atualizar</Link>
          </Button>
        </div>
      </section>
      <div className="hidden lg:flex">
        <img src={image} alt="imagem" />
      </div>
    </div>
  )
}
