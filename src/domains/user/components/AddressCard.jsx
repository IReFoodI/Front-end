import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

import { Label } from "@/ui/components/ui/label"
import { RadioGroupItem } from "@/ui/components/ui/radio-group"

export function AddressCard({ address, onAddressSelect, toggleOpenModal }) {
  const formatCep = (Cep) => {
    return Cep?.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const navigate = useNavigate()
  const {
    addressId,
    city,
    cep,
    state,
    district,
    street,
    number,
    complement,
    isStandard,
    type,
  } = address

  const handleEdit = () => {
    navigate(`/endereco/editar/${addressId}`, { state: { address } })
  }

  return (
    <div className="flex w-full items-center justify-between rounded-lg p-5 text-left text-sm text-gray-500 antialiased hover:bg-gray-100">
      <div className="flex items-center gap-1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            name="address-default"
            id={`address-${addressId}`}
            value={addressId}
            checked={isStandard}
            onChange={() => onAddressSelect(addressId)}
          />
          <Label htmlFor={`address-${addressId}`}></Label>
        </div>

        <div>
          <p id="title" className="text-orange-500">
            {type}
          </p>
          <p>
            {street}, {number}
          </p>

          {complement && <p>{complement}</p>}
          <p>{district}</p>
          <p>
            {city} - {state} - CEP {formatCep(cep)}
          </p>
        </div>
      </div>
      <span className="flex items-center justify-between gap-3">
        <button onClick={handleEdit}>
          <IconEdit
            size={30}
            className="transition duration-300 hover:text-orange-500"
          />
        </button>
        <button onClick={toggleOpenModal}>
          <IconTrash
            size={30}
            className="transition duration-300 hover:text-orange-500"
          />
        </button>
      </span>
    </div>
  )
}
