import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { addressService } from "@/domains/user/services/addressService"
import { userAddressStore } from "@/domains/user/stores/userAddressStore"
import { Button } from "@/ui/components/ui/button/button"
import { Loading } from "@/ui/components/ui/loading"
import { RadioGroup } from "@/ui/components/ui/radio-group"

import { AddressCard } from "./AddressCard"
import { AddressDeleteModal } from "./AddressDeleteModal "
import { ModalConfirmDefaultAddress } from "./modalConfirmDefaultAddress"

export function AddressPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalDefaultOpen, setIsModalDefaultOpen] = useState(false)
  const [selectAddressId, setSelectAddressId] = useState(null)
  const [selectAddressIdDefault, setSelectAddressIdDefault] = useState(null)
  const { loading: loadingAddress, onRequest: onRequestAddress } = useFetch()
  const { onRequest: onRequestdefaultAddress } = useFetch()
  const { setAddresses, defaultAddress, otherAddresses } = userAddressStore()

  const fetchAddresses = useCallback(
    async (data) => {
      await onRequestAddress({
        request: () => addressService.listAddresses(data),
        onSuccess: (data) => setAddresses(data),
      })
    },
    [onRequestAddress]
  )

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const toggleOpenModal = (isOpen, addressId) => {
    setIsModalOpen(isOpen)
    setSelectAddressId(addressId)
  }

  const toggleOpenModalDefault = (isOpen, addressId) => {
    setIsModalDefaultOpen(isOpen)
    setSelectAddressIdDefault(addressId)
  }

  const handleAddressChange = async (id) => {
    await onRequestdefaultAddress({
      request: () => addressService.patchAddressById(id),
      onSuccess: () => {
        fetchAddresses()
        toggleOpenModalDefault(false, null)
      },
      successMessage: "Endereço padrão atualizado",
    })
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
        <RadioGroup className="default-style pb-4">
          <div className="flex flex-col space-y-4">
            <div className="flex-1">
              <h3 className="w-full px-5 text-left font-semibold">Padrão</h3>
              {defaultAddress ? (
                <AddressCard
                  address={defaultAddress}
                  isSelected={defaultAddress.isStantard}
                />
              ) : (
                <div className="my-3 rounded-lg bg-secondary p-2 text-center">
                  <p className="text-base font-semibold text-primary md:text-xl">
                    Você ainda não possue endereço padrão!
                  </p>
                  <p className="mt-2">
                    Adicione um endereço para para melhorar a sua experiência{" "}
                  </p>
                </div>
              )}
              {otherAddresses?.length > 0 && (
                <>
                  <h3 className="w-full px-5 text-left font-semibold">
                    Outros
                  </h3>

                  {otherAddresses.map((address) => (
                    <AddressCard
                      key={address.addressId}
                      address={address}
                      toggleOpenModalDelete={toggleOpenModal}
                      toggleOpenModalDefault={toggleOpenModalDefault}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </RadioGroup>
        <Link to="/endereco/adicionar" className="flex justify-end">
          <Button className="w-full rounded-full border-2 py-5 text-base font-semibold transition-colors duration-300 ease-in-out sm:w-auto">
            Adicionar novo endereço
          </Button>
        </Link>
      </div>

      <AddressDeleteModal
        toggleOpenModalDelete={toggleOpenModal}
        addressId={selectAddressId}
        isModalOpen={isModalOpen}
        fetchAddresses={fetchAddresses}
      />
      <ModalConfirmDefaultAddress
        toggleOpenModal={toggleOpenModalDefault}
        onAddressSelect={handleAddressChange}
        isModalOpen={isModalDefaultOpen}
        addressId={selectAddressIdDefault}
      />
    </>
  )
}
