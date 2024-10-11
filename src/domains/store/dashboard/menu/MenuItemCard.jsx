import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { DatePickerSingle } from "@/domains/store/dashboard/DatePicker"
import { Input } from "@/ui/components/ui/input"
import { Switch } from "@/ui/components/ui/switch"
import { TableCell, TableRow } from "@/ui/components/ui/table"

import { QuantityInput } from "./QuantityInput"

export function MenuItemCard({
  name,
  photo,
  description: initialDescription,
  status: initialStatus,
  expirationDate: initialExpirationDate,
  quantity: initialQuantity,
  originalPrice: initialOriginalPrice,
  sellPrice: initialSellPrice,
  onClick,
}) {
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

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <img
          alt={name || "Product image"}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={photo || "/placeholder.svg"}
          width="64"
        />
      </TableCell>
      <TableCell onClick={onClick} className="cursor-pointer font-medium">
        {name}
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={description}
          onChange={handleChange(setDescription)}
          placeholder="Descrição do produto"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <DatePickerSingle value={expirationDate} onChange={setExpirationDate} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <QuantityInput items={quantity} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Input
          type="text"
          value={originalPrice}
          onChange={handleChange(setOriginalPrice)}
          placeholder="Preço Original"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">
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
        <IconTrash
          size={25}
          className="transition duration-300 hover:text-primary"
        />
      </TableCell>
    </TableRow>
  )
}
