import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { Button } from "@/ui/components/ui/button/button"
import { Loading } from "@/ui/components/ui/loading"
import { RadioGroup } from "@/ui/components/ui/radio-group"

import { addressService } from "../../../services/addressService"
import { AddressCard } from "./AddressCard"
import { AddressDeleteModal } from "./AddressDeleteModal "

export function AddressPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectAddressId, setSelectAddressId] = useState(null)
  const [defaultAddress, setDefaultAddress] = useState([])
  const [otherAddresses, setOtherAddresses] = useState([])
  const { loading: loadingAddress, onRequest: onRequestAddress } = useFetch()
  const { onRequest: onRequestdefaultAddress } = useFetch()

  function filterAddresses(data) {
    const defaultAddr = data.find((address) => address.isStandard)
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

  const toggleOpenModal = (isOpen, addressId) => {
    setIsModalOpen(isOpen)
    setSelectAddressId(addressId)
  }

  const handleAddressChange = async (id) => {
    await onRequestdefaultAddress({
      request: () => addressService.patchAddressById(id),
      onSuccess: () => fetchAddresses(),
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
        <RadioGroup
          className="default-style pb-4"
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
                />
              ) : (
                <p>Não há endereço padrão.</p>
              )}
              {otherAddresses.length > 0 && (
                <>
                  <h3 className="w-full px-5 text-left font-semibold">
                    Outros
                  </h3>

                  {otherAddresses.map((address) => (
                    <AddressCard
                      key={address.addressId}
                      address={address}
                      onAddressSelect={handleAddressChange}
                      toggleOpenModal={toggleOpenModal}
                    />
                  ))}
                </>
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

      <AddressDeleteModal
        toggleOpenModal={toggleOpenModal}
        addressId={selectAddressId}
        isModalOpen={isModalOpen}
        fetchAddresses={fetchAddresses}
      />
    </>
  )
}
