/* eslint-disable react/prop-types */
import { IconEdit, IconTrash } from "@tabler/icons-react"

export function AddressCard({
  address,
  toggleOpenModal,
  selectedOption,
  handleOptionChange,
}) {
  const { type, street, complement, neighborhood, city, state, zipCode } =
    address
  return (
    <div className="flex w-11/12 max-w-[600px] items-center justify-between p-5 text-left text-sm text-gray-500 antialiased hover:bg-gray-100">
      <div className="flex items-center">
        <div className="flex flex-col space-y-4 pe-5">
          <div className="rounded-full border-2 border-orange-500">
            <label className="relative flex cursor-pointer items-center">
              <input
                className="peer sr-only"
                name="address-default"
                type="radio"
                value={address.id}
                checked={selectedOption === address?.id}
                onChange={handleOptionChange}
              />
              <div className="h-4 w-4 rounded-full border-2 border-white bg-transparent transition duration-300 ease-in-out peer-checked:border-white peer-checked:bg-orange-500"></div>
            </label>
          </div>
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
