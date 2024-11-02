import { IconDots } from "@tabler/icons-react"
import { IconPhotoOff } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

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
    categoryProduct: categoryProduct,
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
    if (checked && expirationDate < new Date()) {
      toast.error(`${nameProd} está vencido!`)
      return
    }
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

  useEffect(() => {
    // Verifica se a data de expiração é menor que a data atual
    if (expirationDate && expirationDate < new Date()) {
      setActive(false) // Desabilita o produto
      onStatusChange(product.productId, false) // Atualiza o status no servidor, se necessário
      toast.error(`${nameProd} está vencido!`)
    }
  }, [expirationDate, product.productId])

  const disabledClass = active ? "" : "opacity-50"

  return (
    <TableRow className={disabledClass}>
      <TableCell className="hidden sm:table-cell">
        {urlImgProd ? (
          <img
            alt={nameProd || "Product image"}
            className="aspect-square rounded-md object-cover"
            height="64"
            src={urlImgProd}
            width="64"
          />
        ) : (
          <IconPhotoOff size={26} className="text-gray-500" />
        )}
      </TableCell>
      <TableCell className="font-medium">{nameProd}</TableCell>
      <TableCell className={`pointer-events-none hidden lg:table-cell`}>
        <Input
          type="text"
          disabled={!active}
          defaultValue={product.categoryProduct}
          readOnly
          placeholder="Descrição do produto"
        />
      </TableCell>
      <TableCell className={`pointer-events-none hidden lg:table-cell`}>
        <Input
          type="text"
          disabled={!active}
          defaultValue={product.description}
          readOnly
          placeholder="Descrição do produto"
        />
      </TableCell>
      <TableCell className={`pointer-events-none hidden md:table-cell`}>
        <DatePickerSingle
          className="hidden"
          value={expirationDate}
          onChange={setExpirationDate}
        />
      </TableCell>
      <TableCell className="pointer-events-none">
        <QuantityInput items={initialQuantity || 0} />
      </TableCell>
      <TableCell className={`pointer-events-none hidden w-28 md:table-cell`}>
        <Input
          type="text"
          value={originalPrice}
          readOnly
          onChange={handleChange(setOriginalPrice)}
          placeholder="Preço Original"
        />
      </TableCell>
      <TableCell className="pointer-events-none w-28">
        <Input
          type="text"
          value={sellPrice}
          readOnly
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
