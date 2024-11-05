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

export function MydataPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <div className="flex h-24 w-full flex-col items-center justify-start rounded-xl bg-gradient-to-r from-primary to-primary/85">
        <ProfileImagePlaceholder className="relative bottom-10 z-0 w-20 rounded-full border-4 border-white" />
        <h1 className="relative bottom-5 z-0 text-2xl font-semibold leading-4 text-white">
          Olá, Usuário
        </h1>
      </div>
      <div className="mt-2 flex w-full gap-5">
        <ContainerStatus
          containerIcon={<IconShoppingBag size={30} className="text-primary" />}
          content="1"
          title="pedidos feitos"
        />
        <ContainerStatus
          containerIcon={<IconMoneybag size={30} className="text-primary" />}
          content="R$ 10,00"
          title="economizados"
        />
      </div>
      <div className="mt-2 hidden w-full rounded-md bg-gray-50 lg:block">
        <DefaultAddress />
      </div>
      <div className="flex w-full flex-col gap-2">
        <BasicUserInfo label="Nome" data="Nome do usuário" />
        <div className="lg:flex lg:gap-2">
          <BasicUserInfo label="Celular" data="(xx) xxxxx-xxxx" />
          <BasicUserInfo label="E-mail" data="e-mail@email.com" />
        </div>
        {/* Esse link leva para a rota de alterar os dados do usuário. */}
        {/* por algum motivo colocaram um hidden aqui no lg, não sei como acessaria essa tela no desktop */}
        <Link to="/alterar-dados" className="l mt-7 flex items-center">
          <span className="mr-2">Alterar dados</span>
          <IconCaretRightFilled size={15} />
        </Link>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <DeleteAccountModal />
        <Button className="my-5 flex w-[50%] rounded-full bg-primary p-5 text-lg lg:flex">
          <Link to="/">Atualizar</Link>
        </Button>
      </div>
    </div>
  )
}
