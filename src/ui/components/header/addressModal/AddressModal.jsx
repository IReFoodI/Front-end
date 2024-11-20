import { IconCaretDownFilled, IconMapPinOff } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { addressService } from "@/domains/user/services/addressService"
import { userAddressStore } from "@/domains/user/stores/userAddressStore"

import { NotFound } from "../../NotFound"
import { Button } from "../../ui/button/button"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"

export function AddressModal({ open, onOpenChange }) {
  const formatCep = (Cep) => {
    return Cep?.replace(/(\d{5})(\d{3})/, "$1-$2")
  }
  const { defaultAddress, setAddresses } = userAddressStore()
  const [isActive, setIsActive] = useState(false)
  const { onRequest } = useFetch()

  async function fetchAddressDefault() {
    await onRequest({
      request: () => addressService.listAddresses(),
      onSuccess: (data) => setAddresses(data),
    })
  }

  useEffect(() => {
    fetchAddressDefault()
    //eslint-disable-next-line
  }, [])

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`order-1 m-2 flex w-full cursor-pointer items-center justify-center rounded-xl p-2 hover:bg-[#ffeae4] md:order-2 md:w-fit ${isActive ? "active:bg-orange-100" : ""}`}
          onClick={() => setIsActive(!isActive)}
        >
          <p className="text-sm font-semibold md:text-base">Endereço</p>
          <span>
            <IconCaretDownFilled className="text-primary" size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative top-14 font-inter text-gray-500 md:absolute md:left-0 md:top-5 md:w-96"
        align="start"
      >
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <h1 className="text-base font-bold md:text-xl">
            {defaultAddress ? "Endereço padrão" : "Cadastre um endereço"}
          </h1>
          <p className="text-center text-xs text-[#898CA4] md:text-base">
            {defaultAddress
              ? "Seu endereço padrão ajuda na sua experiência"
              : "Adicione um endereço padrão para personalizar sua experiência"}
          </p>
        </div>
        {defaultAddress ? (
          <div className="my-6 flex w-full flex-col items-start justify-center gap-2 rounded-lg bg-secondary p-2">
            <h1 className="text-base font-semibold text-primary md:text-xl">
              {" "}
              {defaultAddress.type}
            </h1>
            <div>
              <p>
                {defaultAddress.street}, {defaultAddress.number}
              </p>

              {defaultAddress.complement && <p>{defaultAddress.complement}</p>}
              <p>{defaultAddress.district}</p>
              <p>
                {defaultAddress.city} - {defaultAddress.state} - CEP{" "}
                {formatCep(defaultAddress.cep)}
              </p>
            </div>
          </div>
        ) : (
          <NotFound
            Icon={IconMapPinOff}
            title={"Você ainda não possue endereço padrão!"}
            description={
              "Adicione um endereço para para melhorar a sua experiência"
            }
          />
        )}

        <Button
          onClick={() => onOpenChange(false)}
          className="w-full rounded-xl md:text-xl"
        >
          <Link
            to={defaultAddress ? "/endereco" : "/endereco/adicionar"}
            className="w-full sm:text-lg"
          >
            {defaultAddress ? "Meus Endereços" : "Adicionar"}
          </Link>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
