import { IconEdit, IconTrash } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"
import { Label } from "@/ui/components/ui/label"
import { RadioGroupItem } from "@/ui/components/ui/radio-group"

export function AddressCard({
  address,
  toggleOpenModalDelete,
  toggleOpenModalDefault,
}) {
  const pathname = location?.pathname
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
    navigate(
      `/endereco/editar/${addressId}${pathname && `?redirect=${location.pathname}`}`,
      { state: { address } }
    )
  }

  return (
    <motion.li
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="grid grid-flow-col grid-cols-[1fr_10fr] items-center gap-1 rounded-lg p-5 text-left text-sm text-gray-500 antialiased hover:bg-gray-100"
    >
      <div
        onClick={() => toggleOpenModalDefault(true, addressId)}
        className={`flex h-full cursor-pointer items-center space-x-2 p-1 ${isStandard && "pointer-events-none"}`}
      >
        <RadioGroupItem
          name="address-default"
          id={`address-${addressId}`}
          value={addressId}
          className={`${isStandard && "pointer-events-none"}`}
          checked={isStandard}
        />
        <Label htmlFor={`address-${addressId}`}></Label>
      </div>
      <div className="flex justify-between">
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

        <div
          aria-label="Navegação de editar e excluir endereço"
          className="flex items-center justify-between"
        >
          <Button
            onClick={handleEdit}
            variant="ghost"
            className={"px-2 transition duration-300 hover:text-orange-500"}
          >
            <IconEdit size={30} />
          </Button>
          {!address.isStandard && (
            <Button
              onClick={() => toggleOpenModalDelete(true, addressId)}
              variant="ghost"
              className={"px-2 transition duration-300 hover:text-orange-500"}
            >
              <IconTrash size={30} />
            </Button>
          )}
        </div>
      </div>
    </motion.li>
  )
}
