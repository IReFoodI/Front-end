import { IconDots } from "@tabler/icons-react"
import { useState } from "react"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { DatePickerSingle } from "@/domains/store/dashboard/DatePicker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu"
import { Input } from "@/ui/components/ui/input"
import { Switch } from "@/ui/components/ui/switch"
import { TableCell, TableRow } from "@/ui/components/ui/table"

import { QuantityInput } from "./QuantityInput"

export function MenuItemCard({
  product,
  onClick,
  setIsModalOpen,
  setIsDeleteModalOpen,
  setSelectedProduct,
}) {
  const {
    name = "",
    image = "",
    description: initialDescription,
    status: initialStatus,
    expirationDate: initialExpirationDate,
    quantity: initialQuantity,
    originalPrice: initialOriginalPrice,
    sellPrice: initialSellPrice,
  } = product
  const [expirationDate, setExpirationDate] = useState(
    initialExpirationDate ? new Date(initialExpirationDate) : null
  )
  const [description, setDescription] = useState(initialDescription || "")
  const [quantity] = useState(initialQuantity || 0)
  const [originalPrice, setOriginalPrice] = useState(
    currencyFormatter(initialOriginalPrice || 0)
  )
  const [sellPrice, setSellPrice] = useState(
    currencyFormatter(initialSellPrice || 0)
  )
  const [status, setStatus] = useState(!!initialStatus)

  const handleChange = (setter) => (e) => {
    setter(e.target.value)
  }

  const handleStatusChange = (checked) => {
    setStatus(checked)
  }

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <img
            alt={name || "Product image"}
            className="aspect-square rounded-md object-cover"
            height="64"
            src={image}
            width="64"
          />
        </TableCell>
        <TableCell onClick={onClick} className="font-medium">
          {name}
        </TableCell>
        <TableCell className="pointer-events-none">
          <Input
            type="text"
            disabled
            value={description}
            onChange={handleChange(setDescription)}
            placeholder="Descrição do produto"
          />
        </TableCell>
        <TableCell className="pointer-events-none hidden md:table-cell">
          <DatePickerSingle
            value={expirationDate}
            onChange={setExpirationDate}
          />
        </TableCell>
        <TableCell className="pointer-events-none hidden md:table-cell">
          <QuantityInput items={quantity} />
        </TableCell>
        <TableCell className="pointer-events-none hidden md:table-cell">
          <Input
            type="text"
            value={originalPrice}
            onChange={handleChange(setOriginalPrice)}
            placeholder="Preço Original"
          />
        </TableCell>
        <TableCell className="pointer-events-none hidden md:table-cell">
          <Input
            type="text"
            value={sellPrice}
            onChange={handleChange(setSellPrice)}
            placeholder="Preço de Venda"
          />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Switch checked={status} onCheckedChange={handleStatusChange} />
        </TableCell>
        <TableCell className="flex-col items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconDots size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedProduct(product)
                  handleOpenModal()
                  document.body.style.pointerEvents = ""
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDeleteModalOpen(true)
                  setSelectedProduct(product)
                  document.body.style.pointerEvents = ""
                }}
              >
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  )
}
