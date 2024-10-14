import { useState } from "react"

import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"
import { RadioGroup } from "@/ui/components/ui/radio-group"

import { AddressCard } from "./AddressCard"

const addresses = [
  {
    id: "1",
    type: "Casa",
    street: "Av Vamo pra Cima, 10 - Apto 02",
    complement: "Bloco A",
    neighborhood: "Bairro Cruzes",
    city: "Não-me-Toque",
    state: "RS",
    zipCode: "99.999-99",
    isDefault: true,
  },
  {
    id: "2",
    type: "Trabalho",
    street: "Rua do Trabalho, 123 - Sala 45",
    complement: "Edifício Centro",
    neighborhood: "Centro",
    city: "Porto Alegre",
    state: "RS",
    zipCode: "90.000-00",
    isDefault: false,
  },
  {
    id: "3",
    type: "Casa de Praia",
    street: "Praia do Sol, 100 - Casa 3",
    complement: "",
    neighborhood: "Praia do Sol",
    city: "Balneário Camboriú",
    state: "SC",
    zipCode: "88.888-88",
    isDefault: false,
  },
]

export function AddressPage() {
  const defaultAddress = addresses.find((address) => address.isDefault)
  const otherAddresses = addresses.filter((address) => !address.isDefault)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id)

  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleAddressChange = (id) => {
    setSelectedAddressId(id)
  }

  return (
    <>
      <h1 className="fixed left-1/2 -translate-x-1/2 transform text-center text-2xl font-semibold">
        Meus Endereços
      </h1>

      <div className="flex h-full flex-col gap-8 pt-24">
        <RadioGroup
          className="pb-4"
          value={selectedAddressId}
          onValueChange={handleAddressChange}
        >
          <div className="flex flex-col">
            <div className="mx-auto lg:mx-0">
              <h3 className="w-full px-5 text-left font-semibold">Padrão</h3>
              {defaultAddress ? (
                <AddressCard
                  address={defaultAddress}
                  isSelected={selectedAddressId === defaultAddress.id}
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
                    isSelected={selectedAddressId === address.id}
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
        <div className="text-center lg:ps-8 lg:text-left">
          <Button className="w-full max-w-[360px] rounded-full px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out">
            Adicionar novo endereço
          </Button>
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
