import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import useFetch from "@/app/hooks/useFetch"
import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"
import { Loading } from "@/ui/components/ui/loading"
import { RadioGroup } from "@/ui/components/ui/radio-group"

import { addressService } from "../services/addressService"
import { AddressCard } from "./AddressCard"

export function AddressPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [defaultAddress, setDefaultAddress] = useState([])
  const [otherAddresses, setOtherAddresses] = useState([])
  const { loading: loadingAddress, onRequest: onRequestAddress } = useFetch()

  // const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id)

  function filterAddresses(data) {
    const defaultAddr = data.find((address) => address.isStandard)
    console.log("padrao ", defaultAddr)
    const otherAddrs = data.filter((address) => !address.isStandard)
    setDefaultAddress(() => defaultAddr)
    setOtherAddresses(() => otherAddrs)
  }

  const fetchAddresses = useCallback(
    async (data) => {
      await onRequestAddress({
        request: () => addressService.listAddresses(data),
        onSuccess: filterAddresses,
      })
    },
    [onRequestAddress]
  )

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleAddressChange = () => {
    // setSelectedAddressId(id)
  }

  if (loadingAddress) {
    return <Loading />
  }

  return (
    <>
      <h1 className="col-span-full w-full pb-6 text-center text-2xl font-semibold">
        Meus Endereços
      </h1>

      <div className="w-full justify-between">
        <RadioGroup
          className="default-style pb-4"
          // value={selectedAddressId}
          onValueChange={handleAddressChange}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex-1">
              <h3 className="w-full px-5 text-left font-semibold">Padrão</h3>
              {defaultAddress ? (
                <AddressCard
                  address={defaultAddress}
                  isSelected={defaultAddress.isStantard}
                  onAddressSelect={handleAddressChange}
                  toggleOpenModal={toggleOpenModal}
                />
              ) : (
                <p>Não há endereço padrão.</p>
              )}
              <h3 className="w-full px-5 text-left font-semibold">Outros</h3>
              {otherAddresses.length > 0 ? (
                otherAddresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={address.isStantard}
                    onAddressSelect={handleAddressChange}
                    toggleOpenModal={toggleOpenModal}
                  />
                ))
              ) : (
                <p>Não há outros endereços.</p>
              )}
            </div>
          </div>
        </RadioGroup>
        <div className="lg:py-0">
          <Link to="/endereco/adicionar">
            <Button className="w-full rounded-full border-2 px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out">
              Adicionar novo endereço
            </Button>
          </Link>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={toggleOpenModal}>
        <DialogContent>
          <DialogTitle>Deseja realmente excluir este endereço?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o
            endereço.
          </DialogDescription>
          <DialogFooter>
            <Button
              className="rounded-full"
              variant="ghost"
              onClick={toggleOpenModal}
            >
              Cancelar
            </Button>
            <Button
              className="rounded-full"
              variant="destructive"
              onClick={() => {
                //todo ação de excluir aqui
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
