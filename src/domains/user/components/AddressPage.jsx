import { useState } from "react"

// import { Button } from "./Button"
import { Button } from "@/ui/components/ui/button/button"

import { AddressCard } from "./AddressCard"
import ilustra from "./ilustra.png"
import { Modal } from "./Modal"
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
  const [selectedOption, setSelectedOption] = useState(defaultAddress?.id)

  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  function handleOptionChange(e) {
    setSelectedOption(e?.target?.value)
  }

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
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
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
                  toggleOpenModal={toggleOpenModal}
                  selectedOption={selectedOption}
                  handleOptionChange={handleOptionChange}
                />
              ))
            ) : (
              <p>Não há outros endereços.</p>
            )}
          </div>
          <div className="py-11 lg:py-0">
            <Button className="w-full rounded-full border-2 px-4 py-6 text-base font-semibold transition-colors duration-300 ease-in-out">
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
