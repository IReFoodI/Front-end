import { useState } from "react"

import { AddressCard } from "./AddressCard"
import { Button } from "./Button"
import ilustra from "./ilustra.png"
import { Modal } from "./Modal"

export function AddressPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const addresses = [
    {
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

  const defaultAddress = addresses.find((address) => address.isDefault)
  const otherAddresses = addresses.filter((address) => !address.isDefault)

  return (
    <div
      id="page"
      className="mx-auto flex h-screen w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto"
    >
      <h1 className="w-full pb-6 pt-7 text-center text-2xl font-semibold lg:py-10">
        Meus Endereços
      </h1>

      <div className="flex h-full">
        <div className="flex flex-col justify-between lg:w-1/2 lg:ps-5">
          <div className="flex-1">
            <h3 className="w-full px-5 text-left font-semibold">Padrão</h3>
            {defaultAddress ? (
              <AddressCard
                address={defaultAddress}
                toggleOpenModal={toggleOpenModal}
                checked={true}
              />
            ) : (
              <p>Não há endereço padrão.</p>
            )}
            <h3 className="w-full px-5 text-left font-semibold">Outros</h3>
            {otherAddresses.length > 0 ? (
              otherAddresses.map((address, index) => (
                <AddressCard
                  key={index}
                  address={address}
                  toggleOpenModal={toggleOpenModal}
                />
              ))
            ) : (
              <p>Não há outros endereços.</p>
            )}
          </div>
          <div className="py-11 lg:py-0">
            <Button
              color="bg-orange-500"
              textColor="text-white"
              hoverColor="hover:bg-orange-700"
            >
              Adicionar novo endereço
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex">
          <img className="max-h-[700px]" src={ilustra} alt="" />
        </div>
      </div>

      {isModalOpen && (
        <Modal
          body="Deseja realmente excluir este endereço?"
          type="red"
          buttonText="Confirmar"
          onClose={toggleOpenModal}
        />
      )}
    </div>
  )
}