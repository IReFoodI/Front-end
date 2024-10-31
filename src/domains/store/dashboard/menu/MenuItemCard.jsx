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
  setIsModalOpen,
  setIsDeleteModalOpen,
  setSelectedProduct,
  onStatusChange,
}) {
  const {
    nameProd = "",
    urlImgProd = "",
    descriptionProd: initialDescription,
    active: initialStatus,
    expirationDate: initialExpirationDate,
    quantity: initialQuantity,
    originalPrice: initialOriginalPrice,
    sellPrice: initialSellPrice,
  } = product
  const [expirationDate, setExpirationDate] = useState(
    initialExpirationDate ? new Date(initialExpirationDate) : null
  )
  const [description, setDescription] = useState(initialDescription || "")
  const [originalPrice, setOriginalPrice] = useState(
    currencyFormatter(initialOriginalPrice || 0)
  )
  const [sellPrice, setSellPrice] = useState(
    currencyFormatter(initialSellPrice || 0)
  )
  const [active, setActive] = useState(!!initialStatus)

  const handleChange = (setter) => (e) => {
    setter(e.target.value)
  }

  const handleStatusChange = (checked) => {
    setActive(checked)
    onStatusChange(product.productId, checked)
  }

  const openEditModal = () => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const openDeleteModal = () => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  const disabledClass = active ? "" : "opacity-50"

  return (
    <TableRow className={disabledClass}>
      <TableCell className="hidden sm:table-cell">
        <img
          alt={nameProd || "Product image"}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={urlImgProd}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{nameProd}</TableCell>
      <TableCell className={`hidden md:table-cell ${disabledClass}`}>
        <Input
          type="text"
          disabled={!active}
          value={description}
          onChange={handleChange(setDescription)}
          placeholder="Descrição do produto"
        />
      </TableCell>
      <TableCell className={`hidden md:table-cell ${disabledClass}`}>
        <DatePickerSingle value={expirationDate} onChange={setExpirationDate} />
      </TableCell>
      <TableCell className={disabledClass}>
        <QuantityInput items={initialQuantity || 0} />
      </TableCell>
      <TableCell className={`hidden md:table-cell ${disabledClass}`}>
        <Input
          type="text"
          value={originalPrice}
          onChange={handleChange(setOriginalPrice)}
          placeholder="Preço Original"
        />
      </TableCell>
      <TableCell className={disabledClass}>
        <Input
          type="text"
          value={sellPrice}
          onChange={handleChange(setSellPrice)}
          placeholder="Preço de Venda"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Switch checked={active} onCheckedChange={handleStatusChange} />
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconDots size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-16">
            <DropdownMenuItem onClick={openEditModal}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteModal}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
