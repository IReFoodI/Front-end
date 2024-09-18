import { IconEdit, IconTrash } from "@tabler/icons-react"

import { Label } from "@/ui/components/ui/label"
import { RadioGroupItem } from "@/ui/components/ui/radio-group"

export function AddressCard({
  address,
  isSelected,
  onAddressSelect,
  toggleOpenModal,
}) {
  const { id, type, street, complement, neighborhood, city, state, zipCode } =
    address

  return (
    <div className="flex w-11/12 max-w-[600px] items-center justify-between p-5 text-left text-sm text-gray-500 antialiased hover:bg-gray-100">
      <div className="flex items-center">
        <div className="flex items-center space-x-2 pe-5">
          <RadioGroupItem
            name="address-default"
            id={`address-${id}`}
            value={id}
            checked={isSelected}
            onChange={() => onAddressSelect(id)}
          />
          <Label htmlFor={`address-${id}`}></Label>
        </div>

        <div>
          <p id="title" className="text-orange-500">
            {type}
          </p>
          <p>{street}</p>
          {complement && <p>{complement}</p>}
          <p>{neighborhood}</p>
          <p>
            {city} - {state} - CEP {zipCode}
          </p>
        </div>
      </div>
      <span className="flex items-center justify-between gap-3">
        <button>
          <IconEdit
            size={40}
            className="transition duration-300 hover:text-orange-500"
          />
        </button>
        <button onClick={toggleOpenModal}>
          <IconTrash
            size={40}
            className="transition duration-300 hover:text-orange-500"
          />
        </button>
      </span>
    </div>
  )
}
