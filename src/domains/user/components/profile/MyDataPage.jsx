import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { ProfileImagePlaceholder } from "@/ui/assets/ProfileImgePlaceholder"
import { BasicUserInfo } from "@/ui/components/myDataPage/BasicUserInfo"
import { DeleteAccountModal } from "@/ui/components/myDataPage/DeleteAccountModal"
import { Button } from "@/ui/components/ui/button/button"
import { Loading } from "@/ui/components/ui/loading"
import { RadioGroup } from "@/ui/components/ui/radio-group"

import { AddressCard } from "../../../../ui/components/AddressCard"
import { addressService } from "../../services/addressService"
import { userService } from "../../services/userService"
import { userAddressStore } from "../../stores/userAddressStore"
import userStore from "../../stores/userStore"

export function MydataPage() {
  const { user, setUser } = userStore()
  const { defaultAddress, setAddresses } = userAddressStore()
  const [isModalDeleteOpen, setIsModalDeleteOpenOpen] = useState(false)
  const { loading, onRequest } = useFetch()

  const toggleOpenModalDelete = () => setIsModalDeleteOpenOpen((prev) => !prev)

  const fetchStoreProfileSettings = async () => {
    await onRequest({
      request: () => userService.getUserInformation(),
      onSuccess: (data) => {
        setUser(data)
      },
    })
  }
  async function fetchAddressDefault() {
    await onRequest({
      request: () => addressService.listAddresses(),
      onSuccess: (data) => setAddresses(data),
    })
  }

  useEffect(() => {
    fetchStoreProfileSettings()
    fetchAddressDefault()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <div className="mt-8 flex w-full flex-col justify-center gap-2 md:mt-[5vh]">
      <div className="flex h-24 w-full flex-col items-center justify-start rounded-xl bg-gradient-to-r from-primary to-primary/85">
        <ProfileImagePlaceholder className="relative bottom-10 z-0 w-20 rounded-full border-4 border-white" />
        <h1 className="relative bottom-5 z-0 text-2xl font-semibold leading-4 text-white">
          Olá, {user.name}
        </h1>
      </div>
      {defaultAddress ? (
        <ul className="mt-2 w-full rounded-md bg-secondary lg:block">
          <RadioGroup>
            <AddressCard
              address={defaultAddress}
              isSelected={defaultAddress?.isStantard}
            />
          </RadioGroup>
        </ul>
      ) : (
        <div className="my-3 w-full rounded-lg bg-secondary p-2 py-4 text-center">
          <p className="text-base font-semibold text-primary md:text-xl">
            Você ainda não possue endereço padrão!
          </p>
          <p className="mt-2">
            Adicione um endereço para melhorar a sua experiência{" "}
          </p>
        </div>
      )}
      <div className="flex w-full flex-col gap-2">
        <BasicUserInfo label="Nome" data={user.name} />
        <div className="lg:flex lg:gap-2">
          <BasicUserInfo label="Contato" data={user.phone} />
          <BasicUserInfo label="E-mail" data={user.email} />
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-end gap-2 sm:flex-row">
        <Button className="order-1 md:order-2">
          <Link to="/alterar-dados">Alterar dados</Link>
        </Button>
        <Button
          onClick={() => setIsModalDeleteOpenOpen(true)}
          variant={"outline"}
          className="order-2 md:order-1"
        >
          Excluir conta
        </Button>
      </div>
      <DeleteAccountModal
        toggleOpenModal={toggleOpenModalDelete}
        isModalOpen={isModalDeleteOpen}
      />
    </div>
  )
}
